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

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var viewModel = await _userService.GetUser(id);

            return viewModel is null ? NotFound() : Ok(viewModel);
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] SigninInputModel inputModel)
        {
            var loginViewModel = await _userService.SignIn(inputModel);

            return loginViewModel is null ? BadRequest("Login ou senha incorretos!") : Ok(loginViewModel);        
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Signup([FromBody] SignupInputModel inputModel)
        {
            var id = await _userService.SignUp(inputModel);
            return CreatedAtAction(nameof(GetById), new { id = id }, inputModel);
        }
    }
}
