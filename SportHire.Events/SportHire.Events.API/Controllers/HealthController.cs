using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SportHire.Events.API.Controllers
{
    [ApiController]
    [Route("events/[controller]")]
    [Authorize]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Status() => Ok("API is up to date");
    }
}
