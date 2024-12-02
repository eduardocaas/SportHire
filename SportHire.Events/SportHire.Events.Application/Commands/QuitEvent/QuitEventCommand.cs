using MediatR;

namespace SportHire.Events.Application.Commands.QuitEvent
{
    public class QuitEventCommand : IRequest<bool>
    {
        public QuitEventCommand(string id)
        {
            Id = id;
        }

        public string Id { get; private set; }
    }
}
