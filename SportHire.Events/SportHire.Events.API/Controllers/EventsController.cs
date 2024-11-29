﻿using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SportHire.Events.Application.Commands.CancelEvent;
using SportHire.Events.Application.Commands.CreateEvent;
using SportHire.Events.Application.Commands.PlayerHireEvent;
using SportHire.Events.Application.Commands.UpdateEvent;
using SportHire.Events.Application.Queries.GetEventsByCity;
using SportHire.Events.Application.Queries.GetEventsByCityAndSport;
using SportHire.Events.Application.Queries.GetEventsByOwner;
using SportHire.Events.Application.Queries.GetEventsByPlayer;
using SportHire.Events.Application.ViewModels.Events;
using SportHire.Events.Core.Enums;
using SportHire.Events.Core.Exceptions;

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
            [FromQuery(Name = "sport")] EventSportEnum sport,
            [FromQuery(Name = "email")] string email)
        {
            if (sport == EventSportEnum.DEFAULT)
            {
                var query = new GetEventsByCityQuery(city, email);

                var events = await _mediator.Send(query);
                return Ok(events);
            }
            else
            {
                var query = new GetEventsByCityAndSportQuery(city, sport, email);
                var events = await _mediator.Send(query);
                return Ok(events);
            }
        }

        [HttpGet("dash")]
        public async Task<IActionResult> GetByEmail(
            [FromQuery(Name = "emailOwner")] string? emailOwner,
            [FromQuery(Name = "emailPlayer")] string? emailPlayer)
        {          
            if (!emailOwner.Equals("null"))
            {
                var query = new GetEventsByOwnerQuery(emailOwner);
                var events = await _mediator.Send(query);
                return Ok(events);
            }
            if (!emailPlayer.Equals("null"))
            {
                var query = new GetEventsByPlayerQuery(emailPlayer);
                var events = await _mediator.Send(query);
                return Ok(events);
            }
            return Ok(new List<EventViewModel>());       
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateEventCommand command)
        {
            var id = await _mediator.Send(command);

            return Ok();
            // TODO: Criar GetById -> return At Action
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(
            [FromRoute] string id, 
            [FromBody] UpdateEventCommand command)
        {
            command.IdRoute = id;
            var result = await _mediator.Send(command);
            return result ? Ok() : NotFound("Evento não encontrado!");
        }

        [HttpPut("hire/{id}")]
        public async Task<IActionResult> PlayerHire(
            [FromRoute] string id,
            [FromBody] PlayerHireEventCommand command)
        {
            try
            {
                command.EventId = id;
                var result = await _mediator.Send(command);
                return Ok();
            }
            catch(ArgumentException aex)
            {
                return NotFound(aex.Message);
            }
            catch(PlayerExceededLimitException lex)
            {
                return BadRequest(lex.Message);
            }
            catch(PlayerConflictDateException cex)
            {
                return Conflict(cex.Message);
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Cancel(
            [FromRoute] string id)
        {
            CancelEventCommand command = new CancelEventCommand(id);
            var result = await _mediator.Send(command);

            return result ? Ok() : NotFound("Evento não encontrado!");
        }
    }
}
