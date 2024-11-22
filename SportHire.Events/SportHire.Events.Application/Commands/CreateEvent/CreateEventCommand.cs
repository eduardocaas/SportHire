using MediatR;
using SportHire.Events.Core.Enums;

namespace SportHire.Events.Application.Commands.CreateEvent
{
    public class CreateEventCommand : IRequest<int>
    {
        public string EmailOwner { get; set; }
        public string NameOwner { get; set; }
        public EventSportEnum Sport { get; set; }
        public UF Uf { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string Address { get; set; }
        public DateTime StartDate { get; set; }
        public int Duration { get; set; }
        public string? Observation { get; set; }
    }
}
