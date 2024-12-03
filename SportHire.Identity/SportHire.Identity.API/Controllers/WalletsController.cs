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

        [HttpGet]
        [Route("/{email}")]
        public async Task<IActionResult> GetBalance(
            [FromRoute(Name = "email")] string email)
        {
            try
            {
                var amount = await _service.GetBalanceAsync(email);
                return Ok(new { balance = amount });
            }
            catch (ArgumentException aex)
            {
                return NotFound(aex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
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

        [HttpPut]
        [Route("withdraw")]
        public async Task<IActionResult> Withdraw(
            [FromBody] WalletInputModel inputModel)
        {
            try
            {
                await _service.RemoveBalanceAsync(inputModel.Email, inputModel.Amount);
                return Ok();
            }
            catch (ArgumentException aex)
            {
                return NotFound(aex.Message);
            }
            catch (InvalidOperationException iex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, new { message = iex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
            }
        }
    }
}
