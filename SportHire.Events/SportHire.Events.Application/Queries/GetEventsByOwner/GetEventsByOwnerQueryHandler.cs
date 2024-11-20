using MediatR;
using SportHire.Events.Application.ViewModels.Events;
using SportHire.Events.Core.Repositories;

namespace SportHire.Events.Application.Queries.GetEventsByOwner
{
    public class GetEventsByOwnerQueryHandler : IRequestHandler<GetEventsByOwnerQuery, List<EventDashViewModel>>
    {
        private readonly IEventRepository _repository;

        public GetEventsByOwnerQueryHandler(IEventRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<EventDashViewModel>> Handle(GetEventsByOwnerQuery request, CancellationToken cancellationToken)
        {
            var events = await _repository.GetAllByOwnerAsync(request.emailOwner);

            var eventsViewModel = events
                .Select(e =>
                    new EventViewModel(e.Id, e.Sport, e.NameOwner, e.NamePlayer, e.City, e.District, e.Address, e.StartDate, e.Duration, e.Cost))
                .ToList();

            return eventsViewModel;
        }
    }
}
