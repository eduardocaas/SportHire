using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportHire.Identity.Application.InputModels;
using SportHire.Identity.Application.Services;

namespace SportHire.Identity.API.Controllers
{
    [ApiController]
    [Route("identity/[controller]")]
    [Authorize]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] SigninInputModel inputModel)
        {
            var loginViewModel = await _userService.SignIn(inputModel);

            return loginViewModel is null ? BadRequest("Login ou senha incorretos!") : Ok(loginViewModel); 

            
        }
    }
}
