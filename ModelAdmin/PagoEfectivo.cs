using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    [Table("PagoEfectivo")]
    public partial class PagoEfectivo
    {
        [Key]
        [StringLength(50)]
        public string IdPagoEfectivo { get; set; }

        public string CodigoPagoEfectivo { get; set; }

        public string Nombre { get; set; }

        public string Email { get; set; }

        [StringLength(50)]
        public string Estado { get; set; }

        [StringLength(50)]
        public string UsuarioCrea { get; set; }

        public DateTime? FechaCrea { get; set; }

        [StringLength(50)]
        public string UsuarioMod { get; set; }

        public DateTime? FechaMod { get; set; }

        [StringLength(50)]
        public string Accion { get; set; }
    }
}
