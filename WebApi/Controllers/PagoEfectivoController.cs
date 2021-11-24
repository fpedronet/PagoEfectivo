
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IService;
using Microsoft.AspNetCore.Mvc;
using Dto;
using Microsoft.AspNetCore.Authorization;
using System.Net.Http;
using Newtonsoft.Json;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/pagoefectivo")]
    public class PagoEfectivoController : BaseController
    {
        private readonly IPagoEfectivo _pagoEfectivo;

        public PagoEfectivoController(IPagoEfectivo pagoEfectivo)
        {
            _pagoEfectivo = pagoEfectivo;
        }

        [HttpGet("getListarPagoEfectivo")]
        public async Task<IActionResult> getListarPagoEfectivo(int page, int pages, string request)
        {
            var result = await _pagoEfectivo.getListarPagoEfectivo(page, pages, request);

            return Ok(result);
        }

        [HttpGet("getObtenerPagoEfectivo")]
        public async Task<IActionResult> getObtenerPagoEfectivo(string id)
        {
            var result = await _pagoEfectivo.getObtenerPagoEfectivo(id);

            return Ok(result);
        }

        [HttpPost("postGenerarCodigo")]
        public async Task<IActionResult> postGenerarCodigo(PagoEfectivoDto model)
        {
            model.UsuarioCrea = CurrentUser.UserName;

            var result = await _pagoEfectivo.postGenerarCodigo(model);

            return Ok(result);
        }

        [HttpPost("postCanjearCodigo")]
        public async Task<IActionResult> postCanjearCodigo(PagoEfectivoDto model)
        {
            model.UsuarioCrea = CurrentUser.UserName;

            var result = await _pagoEfectivo.postCanjearCodigo(model);

            return Ok(result);
        }

    }
}
