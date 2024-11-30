using MediatR;
using SportHire.Events.Core.Enums;

namespace SportHire.Events.Application.Commands.ConfirmEvent
{
    public class ConfirmEventCommand : IRequest<EventConfirmEnum>
    {
        public ConfirmEventCommand(string id, UserProfileEnum userProfile)
        {
            Id = id;
            UserProfile = userProfile;
        }

        public string Id { get; private set; }
        public UserProfileEnum UserProfile { get; private set; }
    }
}
