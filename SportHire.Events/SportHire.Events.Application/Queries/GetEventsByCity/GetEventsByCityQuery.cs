using MediatR;
using SportHire.Events.Application.ViewModels.Events;

namespace SportHire.Events.Application.Queries.GetEventsByCity
{
    public class GetEventsByCityQuery : IRequest<List<EventPlayerViewModel>>
    {
        public GetEventsByCityQuery(string city)
        {
            this.city = city;
        }

        public string city { get; private set; }
    }
}
