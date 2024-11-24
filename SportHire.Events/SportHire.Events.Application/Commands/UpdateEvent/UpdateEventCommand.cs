using MediatR;
using SportHire.Events.Core.Enums;

namespace SportHire.Events.Application.Commands.UpdateEvent
{
    public class UpdateEventCommand : IRequest<bool>
    {
        public UpdateEventCommand(string idRoute)
        {
            IdRoute = idRoute;
        }

        public string? IdRoute { get; set; }

        public string Id { get; set; }
        public string District { get; set; }
        public string Address { get; set; }
        public DateTime StartDate { get; set; }
        public int Duration { get; set; }
        public string? Observation { get; set; }
    }
}
