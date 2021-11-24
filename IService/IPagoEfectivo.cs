using Common;
using Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IService
{
    public interface IPagoEfectivo
    {
        Task<DataCollection<PagoEfectivoDto>> getListarPagoEfectivo(int page, int pages, string request);

        Task<PagoEfectivoDto> getObtenerPagoEfectivo(string id);

        Task<RespuestaDto> postGenerarCodigo(PagoEfectivoDto model);

        Task<RespuestaDto> postCanjearCodigo(PagoEfectivoDto model);

    }
}
