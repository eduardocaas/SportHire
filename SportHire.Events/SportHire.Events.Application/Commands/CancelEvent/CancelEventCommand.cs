using MediatR;

namespace SportHire.Events.Application.Commands.CancelEvent
{
    public class CancelEventCommand : IRequest<bool>
    {
        public CancelEventCommand(string id)
        {
            Id = id;
        }

        public string Id { get; private set; }
    }
}
