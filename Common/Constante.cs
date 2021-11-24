using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class TipoRespuesta
    {
        public const int Error = 0;
        public const int Exito = 1;
        public const int Alerta = 2;
    }

    public class Mensaje
    {
        public const string ExitoGuardar = "La promocion ha sido generado";
        public const string ExitoActualizar = "La promocion ha sido canjeado";
        public const string ExisteEmail = "Ya se emitio un codigo para este correo, intente con otro";
    }

    public class Accion
    {
        public const string Creado = "CREADO";
        public const string Modificado = "MODIFICADO";
        public const string Eliminado = "ELIMINADO";
        public const string Anulado = "ANULADO";
        public const string Activado = "ACTIVADO";
    }

    public class EstadoPromocion
    {
        public const string GENERADO = "GEN";
        public const string CANJEAOD = "CAN";
    }


}
