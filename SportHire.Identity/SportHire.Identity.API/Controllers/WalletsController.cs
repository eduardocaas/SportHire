using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportHire.Identity.Application.InputModels;
using SportHire.Identity.Application.Services;

namespace SportHire.Identity.API.Controllers
{
    [ApiController]
    [Route("identity/[controller]")]
    [Authorize]
    public class WalletsController : ControllerBase
    {
        private readonly IWalletService _service;

        public WalletsController(IWalletService service)
        {
            _service = service;
        }

        [HttpPut]
        [Route("deposit")]
        public async Task<IActionResult> Deposit(
            [FromBody] WalletInputModel inputModel)
        {
            try
            {
                await _service.AddBalanceAsync(inputModel.Email, inputModel.Amount);
                return Ok();
            }
            catch(ArgumentException aex)
            {
                return NotFound(aex.Message);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
    }
}
