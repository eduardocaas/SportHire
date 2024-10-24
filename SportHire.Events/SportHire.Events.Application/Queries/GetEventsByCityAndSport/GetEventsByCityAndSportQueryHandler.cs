using MediatR;
using SportHire.Events.Application.ViewModels.Events;

namespace SportHire.Events.Application.Queries.GetEventsByCityAndSport
{
    public class GetEventsByCityAndSportQueryHandler : IRequestHandler<GetEventsByCityAndSportQuery, List<EventPlayerViewModel>>
    {
        public Task<List<EventPlayerViewModel>> Handle(GetEventsByCityAndSportQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
