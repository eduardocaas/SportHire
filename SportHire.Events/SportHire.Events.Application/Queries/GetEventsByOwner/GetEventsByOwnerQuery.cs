using MediatR;
using SportHire.Events.Application.ViewModels.Events;

namespace SportHire.Events.Application.Queries.GetEventsByOwner
{
    public class GetEventsByOwnerQuery : IRequest<List<EventDashViewModel>>
    {
        public GetEventsByOwnerQuery(string emailOwner)
        {
            this.emailOwner = emailOwner;
        }

        public string emailOwner { get; private set; }
    }
}
