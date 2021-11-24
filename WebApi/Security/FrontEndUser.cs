using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebApi.Security
{
    public class FrontEndUser : ClaimsPrincipal
    {
        public FrontEndUser(ClaimsPrincipal principal) 
            : base(principal)
        { }
        public string UserId { get { return this.Identity.IsAuthenticated ? this.FindFirst("UserId").Value : ""; } }
        public string UserName { get { return this.Identity.IsAuthenticated ? this.FindFirst("UserName").Value : ""; } }
        public string Email { get { return this.Identity.IsAuthenticated ? this.FindFirst("Email").Value : ""; } }
        public string NombreCompleto { get { return this.Identity.IsAuthenticated ? this.FindFirst("NombreCompleto").Value : ""; } }
    }
}
