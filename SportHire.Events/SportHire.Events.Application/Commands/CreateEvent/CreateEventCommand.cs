﻿using MediatR;
using SportHire.Events.Core.Enums;

namespace SportHire.Events.Application.Commands.CreateEvent
{
    public class CreateEventCommand : IRequest<int>
    {
        public string EmailOwner{ get; set; }
        public EventSportEnum Sport { get; set; }
        public UF Uf { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public DateTime StartDate { get; set; }
        public string Duration { get; set; }
        public int Cost { get; set; }
    }
}
