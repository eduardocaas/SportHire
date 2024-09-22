using Microsoft.AspNetCore.Mvc;
using SportHire.Identity.Application.Services;

namespace SportHire.Identity.API.Controllers
{
    [ApiController]
    [Route("identity/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }
    }
}
