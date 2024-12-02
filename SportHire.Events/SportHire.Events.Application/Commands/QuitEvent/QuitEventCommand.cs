using MediatR;
using SportHire.Events.Core.Enums;

namespace SportHire.Events.Application.Commands.QuitEvent
{
    public class QuitEventCommand : IRequest<int>
    {
        public QuitEventCommand(string id, UserProfileEnum profile)
        {
            Id = id;
            UserProfile = profile;
        }

        public string Id { get; private set; }
        public UserProfileEnum UserProfile { get; private set; }
    }
}
