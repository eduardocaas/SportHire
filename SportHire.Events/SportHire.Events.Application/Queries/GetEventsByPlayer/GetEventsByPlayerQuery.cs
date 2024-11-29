using MediatR;
using SportHire.Events.Application.ViewModels.Events;

namespace SportHire.Events.Application.Queries.GetEventsByPlayer
{
    public class GetEventsByPlayerQuery : IRequest<List<EventViewModel>>
    {
        public GetEventsByPlayerQuery(string emailPlayer)
        {
            EmailPlayer = emailPlayer;
        }

        public string EmailPlayer { get; private set; }
    }
}
