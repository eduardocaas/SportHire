using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SportHire.Events.Application.Commands.CreateEvent;
using SportHire.Events.Application.Queries.GetEventsByCity;
using SportHire.Events.Application.Queries.GetEventsByCityAndSport;
using SportHire.Events.Core.Enums;

namespace SportHire.Events.API.Controllers
{
    [ApiController]
    [Route("events")]
    [Authorize]
    public class EventsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public EventsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetByCityAndSport(
            [FromQuery(Name = "city")] string city, 
            [FromQuery(Name = "sport")] EventSportEnum sport)
        {
            var query = new GetEventsByCityAndSportQuery(city, sport);

            var events = await _mediator.Send(query);

            return Ok(events);
        }

        [HttpGet]
        public async Task<IActionResult> GetByCity(
            [FromQuery(Name = "city")] string city)
        {
            var query = new GetEventsByCityQuery(city);
            var events = await _mediator.Send(query);

            return Ok(events);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateEventCommand command)
        {
            var id = await _mediator.Send(command);

            return Ok();
            // TODO: Criar GetById -> return At Action
        }
    }
}
