using System;
using System.Threading.Tasks;
using IService;
using Microsoft.AspNetCore.Mvc;
using Dto;
using Microsoft.AspNetCore.Identity;
using Model;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using NUlid;
using Common;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/usuario")]
    public class UsuarioController : BaseController
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly SignInManager<Usuario> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(UserManager<Usuario> userManager,
                                 SignInManager<Usuario> signInManager,
                                 IConfiguration configuration,
                                 IUsuarioService usuarioService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _usuarioService = usuarioService;
        }

        [HttpGet("getListarUsuario")]
        public async Task<IActionResult> getListarUsuario(int page, int pages, string request)
        {
            var result = await _usuarioService.getListarUsuario(page, pages, request);

            return Ok(result);
        }

        [HttpGet("getObtenerUsuario")]
        public async Task<IActionResult> getObtenerUsuario(string id)
        {
            var result = await _usuarioService.getObtenerUsuario(id);

            return Ok(result);
        }

        [HttpGet("getObtenerUsuarioSesion")]
        public async Task<IActionResult> getObtenerUsuarioSesion()
        {
            string id = CurrentUser.UserId;

            var user = await _userManager.FindByIdAsync(id);

            if (user == null) return BadRequest("Acceso no valido al sistema.");

            UsuarioData model = new UsuarioData();
            model.Email = user.Email;
            model.NombreCompleto = user.NombreCompleto;
            model.Username = user.UserName;

            return Ok(model);
        }

        [AllowAnonymous]
        [HttpPost("postGuardarUsuario")]
        public async Task<IActionResult> postGuardarUsuario(UsuarioDto model)
        {
            RespuestaDto respuesta = new RespuestaDto();

            if (string.IsNullOrEmpty(model.IdUser))
            {
                var user = new Usuario
                {
                    IdUser = (string.IsNullOrEmpty(model.IdUser)) ? Ulid.NewUlid().ToString() : model.IdUser,
                    Name = model.Name,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    UserName = model.UserName,
                    PhoneNumber = model.PhoneNumber,
                    Email = model.Email,
                    FechaCrea = DateTime.Now,
                    UsuarioCrea = model.UsuarioCrea,
                    Accion = Accion.Creado,
                    NombreCompleto = model.Name.ToUpper() + " " + model.FirstName.ToUpper() + " " + model.LastName.ToUpper()
                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (!result.Succeeded)
                {
                    throw new Exception("No se pudo crear el usuario");
                }
                else
                {
                    respuesta.TipoRespuesta = TipoRespuesta.Exito;
                    respuesta.Mensaje = Mensaje.ExitoGuardar;
                }
            }
            else
            {
                var user = await _userManager.FindByIdAsync(model.Id);

                user.Name = model.Name;
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.UserName = model.UserName;
                user.PhoneNumber = model.PhoneNumber;
                user.Email = model.Email;
                user.FechaMod = DateTime.Now;
                user.UsuarioMod = CurrentUser.UserName;
                user.Accion = Accion.Modificado;
                user.NombreCompleto = model.Name.ToUpper() + " " + model.FirstName.ToUpper() + " " + model.LastName.ToUpper();

                var result = await _userManager.UpdateAsync(user);

                if (!result.Succeeded)
                {
                    throw new Exception("No se pudo crear el usuario");
                }
                else
                {
                    respuesta.TipoRespuesta = TipoRespuesta.Exito;
                    respuesta.Mensaje = Mensaje.ExitoGuardar;
                }
            }


            return Ok(respuesta);
        }

        [AllowAnonymous]
        [HttpPost("postLogin")]
        public async Task<IActionResult> postLogin(UsuarioDto model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);

            if (user == null) return BadRequest("Acceso no valido al sistema.");

            var check = await _signInManager.CheckPasswordSignInAsync(user, model.Password, false);

            if (check.Succeeded)
            {
                UsuarioData usuarioData = new UsuarioData();

                usuarioData.NombreCompleto = user.NombreCompleto;
                usuarioData.Token = GenerateToken(user);
                usuarioData.Username = user.UserName;
                usuarioData.Email = user.Email;

                return Ok(usuarioData);

            }
            else
            {
                return BadRequest("Acceso no valido al sistema.");
            }

        }

        public string GenerateToken(Usuario entity)
        {

            var claims = new List<Claim>
            {
                new Claim("UserId", entity.Id),
                new Claim("UserName", entity.UserName),
                new Claim("NombreCompleto", entity.NombreCompleto),
                new Claim("Email", entity.Email),
            };

            var secretKey = _configuration.GetValue<string>("SecretKey");
            var key = Encoding.ASCII.GetBytes(secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var createdToken = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(createdToken);
        }

    }
}
