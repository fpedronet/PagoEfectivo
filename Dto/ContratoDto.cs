using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto
{
    public class PagoEfectivoDto
    {
        public string IdPagoEfectivo { get; set; }

        public string CodigoPagoEfectivo { get; set; }

        public string Nombre { get; set; }

        public string Email { get; set; }

        public string Estado { get; set; }

        public string UsuarioCrea { get; set; }

        public DateTime? FechaCrea { get; set; }

        public string UsuarioMod { get; set; }

        public DateTime? FechaMod { get; set; }

        public string Accion { get; set; }
    }
}
