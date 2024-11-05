using MediatR;
using SportHire.Events.Application.ViewModels.Events;
using SportHire.Events.Core.Repositories;

namespace SportHire.Events.Application.Queries.GetEventsByCityAndSport
{
    public class GetEventsByCityAndSportQueryHandler : IRequestHandler<GetEventsByCityAndSportQuery, List<EventPlayerViewModel>>
    {
        private readonly IEventRepository _repository;

        public GetEventsByCityAndSportQueryHandler(IEventRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<EventPlayerViewModel>> Handle(GetEventsByCityAndSportQuery request, CancellationToken cancellationToken)
        {
            var events = await _repository.GetAllByCityAndSportAsync(request.City, request.Sport);

            var eventsViewModel = events
                .Select(e => new EventPlayerViewModel(e.Id, e.Sport, e.City, e.District, e.Address, e.StartDate, e.Duration, e.Cost))
                .ToList();

            return eventsViewModel;
        }
    }
}
