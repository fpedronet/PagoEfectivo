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
using System.Collections.Generic;

namespace Service
{
    public class PagoEfectivoService : IPagoEfectivo
    {
        private readonly PersistenceDbContext _dbContext;
        private readonly IMapper _mapper;

        public PagoEfectivoService(PersistenceDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<DataCollection<PagoEfectivoDto>> getListarPagoEfectivo(int page, int pages, string request)
        {
            Task<DataCollection<PagoEfectivoDto>> plan = null;

            var query = (from pa in _dbContext.PagoEfectivo
                         join mis1 in _dbContext.Miscelaneo.Where(x => x.IdTabla == "estado_promocion") on pa.Estado equals mis1.Value into m1Left
                         from mis1 in m1Left.DefaultIfEmpty()
                         orderby pa.FechaCrea descending
                         select new PagoEfectivoDto
                         {
                             IdPagoEfectivo = pa.IdPagoEfectivo,
                             CodigoPagoEfectivo = pa.CodigoPagoEfectivo,
                             Email = pa.Email,
                             Nombre = pa.Nombre,
                             Estado = mis1.Text
                         }).AsQueryable();

            if (!string.IsNullOrEmpty(request))
            {
                plan = query.Where(y => y.Nombre.Trim().ToLower().Contains(request.Trim().ToLower())).PagedAsync(page, pages);
            }
            else
            {
                plan = query.PagedAsync(page, pages);
            }

            return await plan;
        }

        public async Task<PagoEfectivoDto> getObtenerPagoEfectivo(string id)
        {
            PagoEfectivoDto model = new PagoEfectivoDto();

            if (!string.IsNullOrEmpty(id))
            {
                var contrato = await (from pa in _dbContext.PagoEfectivo
                                      join mis1 in _dbContext.Miscelaneo.Where(x => x.IdTabla == "estado_promocion") on pa.Estado equals mis1.Value into m1Left
                                      from mis1 in m1Left.DefaultIfEmpty()
                                      where
                                      pa.IdPagoEfectivo == id
                                      select new PagoEfectivoDto
                                      {
                                          IdPagoEfectivo = pa.IdPagoEfectivo,
                                          CodigoPagoEfectivo = pa.CodigoPagoEfectivo,
                                          Email = pa.Email,
                                          Nombre = pa.Nombre,
                                          Estado = mis1.Text
                                      }).FirstOrDefaultAsync();


                model = contrato;

            }

            return model;
        }

        public async Task<RespuestaDto> postGenerarCodigo(PagoEfectivoDto model)
        {
            RespuestaDto respuesta = new RespuestaDto();

            #region [Validar Email]
            var existemail = _dbContext.PagoEfectivo.Any(y => y.Email.Trim().ToLower() == model.Email.Trim().ToLower());

            if (existemail)
            {
                respuesta.TipoRespuesta = TipoRespuesta.Alerta;
                respuesta.Mensaje = Mensaje.ExisteEmail;

                return respuesta;
            }
            #endregion

            #region [Genrando Codigo Promocion]
            PagoEfectivo entity = new PagoEfectivo();

            var count = _dbContext.PagoEfectivo.Count();
            count++;

            entity.IdPagoEfectivo = Ulid.NewUlid().ToString();
            entity.CodigoPagoEfectivo = string.Concat("PF000" + count);
            entity.Email = model.Email;
            entity.Nombre = model.Nombre;
            entity.Estado = EstadoPromocion.GENERADO;
            entity.UsuarioCrea = model.UsuarioCrea;
            entity.FechaCrea = DateTime.Now;
            entity.Accion = Accion.Creado;

            await _dbContext.PagoEfectivo.AddAsync(entity);

            await _dbContext.SaveChangesAsync();

            respuesta.TipoRespuesta = TipoRespuesta.Exito;
            respuesta.Mensaje = Mensaje.ExitoGuardar;
            #endregion           

            return respuesta;
        }

        public async Task<RespuestaDto> postCanjearCodigo(PagoEfectivoDto model)
        {
            RespuestaDto respuesta = new RespuestaDto();

            #region [Generando Canje Promocion]
            var entity = _dbContext.PagoEfectivo.Where(y => y.IdPagoEfectivo == model.IdPagoEfectivo).FirstOrDefault();

            entity.Estado = EstadoPromocion.CANJEAOD;
            entity.UsuarioMod = model.UsuarioCrea;
            entity.FechaMod = DateTime.Now;
            entity.Accion = Accion.Modificado;

            _dbContext.PagoEfectivo.Update(entity);

            await _dbContext.SaveChangesAsync();

            respuesta.TipoRespuesta = TipoRespuesta.Exito;
            respuesta.Mensaje = Mensaje.ExitoActualizar;
            #endregion

            return respuesta;
        }
    }
}
