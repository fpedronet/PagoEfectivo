
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IService;
using Microsoft.AspNetCore.Mvc;
using Dto;
using WebApi.Security;
using System.Security.Claims;

namespace WebApi.Controllers
{
    public class BaseController : ControllerBase
    {
        public FrontEndUser CurrentUser { get { return new FrontEndUser(this.User as ClaimsPrincipal); } }
    }
}
