using MediatR;
using SportHire.Events.Application.ViewModels.Events;
using SportHire.Events.Core.Enums;

namespace SportHire.Events.Application.Queries.GetEventsByCityAndSport
{
    public class GetEventsByCityAndSportQuery : IRequest<List<EventPlayerViewModel>>
    {
        public GetEventsByCityAndSportQuery(string city, EventSportEnum sport, string email)
        {
            City = city;
            Sport = sport;
            Email = email;
        }

        public string City { get; private set; }
        public EventSportEnum Sport { get; private set; }
        public string Email { get; private set; }
    }
}
