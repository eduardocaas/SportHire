using MediatR;

namespace SportHire.Events.Application.Commands.PlayerHireEvent
{
    public class PlayerHireEventCommand : IRequest<bool>
    {
        public string? EventId { get; set; }
        public string NamePlayer { get; set; }
        public string EmailPlayer { get; set; }
    }
}
