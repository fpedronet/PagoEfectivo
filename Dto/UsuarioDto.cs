﻿namespace Dto
{
    public class UsuarioDto
    {
        public string Id { get; set; }

        public string IdUser { get; set; }

        public string Name { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Password { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string NombreCompleto { get; set; }

        public string Telefono { get; set; }

        public string UsuarioCrea { get; set; }
    }

    public class UsuarioData
    {
        public string NombreCompleto { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
    }
}
