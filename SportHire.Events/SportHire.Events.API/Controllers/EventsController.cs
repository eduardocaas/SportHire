using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SportHire.Events.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class EventsController : ControllerBase
    {
    }
}
