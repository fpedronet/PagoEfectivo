using AdminDbContext;
using AutoMapper;
using Common;
using Dto;
using Model;
using IService;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NUlid;
using Microsoft.AspNetCore.Identity;

namespace Service
{
    public class UsuarioService : IUsuarioService
    {
        private readonly PersistenceDbContext _dbContext;

        public UsuarioService(PersistenceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<DataCollection<UsuarioDto>> getListarUsuario(int page, int pages, string request)
        {
            Task<DataCollection<UsuarioDto>> usuario = null;

            var query = (from us in _dbContext.Usuario
                         orderby us.FechaCrea descending
                         select new UsuarioDto
                         {
                             IdUser = us.IdUser,
                             UserName = us.UserName,
                             Email = us.Email,
                             Telefono = us.PhoneNumber,
                             NombreCompleto = us.NombreCompleto
                         }).AsQueryable();

            if (!string.IsNullOrEmpty(request))
            {
                usuario = query.Where(y => y.NombreCompleto.Trim().ToLower().Contains(request.Trim().ToLower())).PagedAsync(page, pages);
            }
            else
            {
                usuario = query.PagedAsync(page, pages);
            }

            return await usuario;
        }

        public async Task<UsuarioDto> getObtenerUsuario(string id)
        {
            var usuario = await (from us in _dbContext.Usuario
                                 where
                                 us.IdUser == id
                                 select new UsuarioDto
                                 {
                                     Id = us.Id,
                                     IdUser = us.IdUser,
                                     Name = us.Name,
                                     FirstName = us.FirstName,
                                     LastName = us.LastName,
                                     UserName = us.UserName,
                                     PhoneNumber = us.PhoneNumber,
                                     Email = us.Email,
                                     Password = us.PasswordHash
                                 }).FirstOrDefaultAsync();

            return usuario;
        }


    }
}
