using MediatR;
using SportHire.Events.Application.ViewModels.Events;
using SportHire.Events.Core.Repositories;

namespace SportHire.Events.Application.Queries.GetEventsByCityAndSport
{
    public class GetEventsByCityAndSportQueryHandler : IRequestHandler<GetEventsByCityAndSportQuery, List<EventViewModel>>
    {
        private readonly IEventRepository _repository;

        public GetEventsByCityAndSportQueryHandler(IEventRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<EventViewModel>> Handle(GetEventsByCityAndSportQuery request, CancellationToken cancellationToken)
        {
            var events = await _repository.GetAllByCityAndSportAsync(request.City, request.Sport, request.Email);

            var eventsViewModel = events
                .Select(e => new EventViewModel(
                        e.Id,
                        e.Sport,
                        e.Status,
                        e.NameOwner,
                        e.NamePlayer,
                        e.City,
                        e.District,
                        e.Address,
                        e.StartDate,
                        e.Duration,
                        e.Cost,
                        e.Observation,
                        e.ConfirmPlayer,
                        e.ConfirmOwner))
                .ToList();

            return eventsViewModel;
        }
    }
}
