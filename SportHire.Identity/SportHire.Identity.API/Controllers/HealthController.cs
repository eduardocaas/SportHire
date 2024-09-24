using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SportHire.Identity.API.Controllers
{
    [ApiController]
    [Route("identity/[controller]")]
    [Authorize]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Status()
        {
            return Ok("API is up to date");
        }
    }
}
