using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class Usuario : IdentityUser
    {
        public string Name { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string NombreCompleto { get; set; }

        public string IdUser { get; set; }

        public DateTime? FechaCrea { get; set; }

        [StringLength(50)]
        public string UsuarioCrea { get; set; }

        public DateTime? FechaMod { get; set; }

        [StringLength(50)]
        public string UsuarioMod { get; set; }

        [StringLength(25)]
        public string Accion { get; set; }

    }
}
