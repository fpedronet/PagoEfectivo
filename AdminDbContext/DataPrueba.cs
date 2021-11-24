using Microsoft.AspNetCore.Identity;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdminDbContext
{
    public class DataPrueba
    {
        public static async Task InsertarData(PersistenceDbContext context, UserManager<Usuario> usuarioManager)
        {
            if (!usuarioManager.Users.Any())
            {
                var usuario = new Usuario
                {
                    Name = "Francisco Pedro",
                    FirstName = "Condor",
                    LastName = "Martinez",
                    NombreCompleto = "Francisco Pedro",
                    UserName = "fcondor",
                    Email = "fpedro.martinez.net@gmail.com",
                    IdUser = "01EKMXK9DMV7MS8AZ7WFHCF4SP",
                    PhoneNumber = "965839805"
                };

                await usuarioManager.CreateAsync(usuario, "@Admin123");
            }
        }
    }
}
