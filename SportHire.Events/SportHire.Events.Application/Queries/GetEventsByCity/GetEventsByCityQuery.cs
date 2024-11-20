using MediatR;
using SportHire.Events.Application.ViewModels.Events;

namespace SportHire.Events.Application.Queries.GetEventsByCity
{
    public class GetEventsByCityQuery : IRequest<List<EventViewModel>>
    {
        public GetEventsByCityQuery(string city, string email)
        {
            this.city = city;
            this.email = email;
        }

        public string city { get; private set; }
        public string email { get; private set; }
    }
}
