using MediatR;
using SportHire.Events.Application.ViewModels.Events;

namespace SportHire.Events.Application.Queries.GetEventsByCity
{
    public class GetEventsByCityQueryHandler : IRequestHandler<GetEventsByCityQuery, List<EventPlayerViewModel>>
    {
        public Task<List<EventPlayerViewModel>> Handle(GetEventsByCityQuery request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
