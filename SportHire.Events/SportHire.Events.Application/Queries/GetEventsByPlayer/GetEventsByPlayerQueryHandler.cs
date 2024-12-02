using MediatR;
using SportHire.Events.Application.ViewModels.Events;
using SportHire.Events.Core.Repositories;

namespace SportHire.Events.Application.Queries.GetEventsByPlayer
{
    public class GetEventsByPlayerQueryHandler : IRequestHandler<GetEventsByPlayerQuery, List<EventViewModel>>
    {
        private readonly IEventRepository _repository;

        public GetEventsByPlayerQueryHandler(IEventRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<EventViewModel>> Handle(GetEventsByPlayerQuery request, CancellationToken cancellationToken)
        {
            var events = await _repository.GetAllByPlayerAsync(request.EmailPlayer);
            var eventsViewModel = events
                .Select(
                    e => new EventViewModel(
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
                        e.ConfirmOwner,
                        e.PlayerChangeAttempts))
                .ToList();

            return eventsViewModel;
        }
    }
}
