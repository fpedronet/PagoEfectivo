using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Model
{
    [Table("Miscelaneo")]
    public partial class Miscelaneo
    {
        [Key]
        [StringLength(50)]
        public string IdMiscelaneo { get; set; }

        [StringLength(50)]
        public string IdTabla { get; set; }

        public int NroOrden { get; set; }

        [StringLength(50)]
        public string Value { get; set; }

        [StringLength(50)]
        public string Text { get; set; }

    }
}
