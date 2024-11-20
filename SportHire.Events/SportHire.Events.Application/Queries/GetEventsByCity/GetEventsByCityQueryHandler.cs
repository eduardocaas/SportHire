using MediatR;
using SportHire.Events.Application.ViewModels.Events;
using SportHire.Events.Core.Repositories;

namespace SportHire.Events.Application.Queries.GetEventsByCity
{
    public class GetEventsByCityQueryHandler : IRequestHandler<GetEventsByCityQuery, List<EventPlayerViewModel>>
    {
        private readonly IEventRepository _repository;

        public GetEventsByCityQueryHandler(IEventRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<EventPlayerViewModel>> Handle(GetEventsByCityQuery request, CancellationToken cancellationToken)
        {
            var events = await _repository.GetAllByCityAsync(request.city, request.email);
            var eventsViewModel = events
                .Select(e => new EventPlayerViewModel(e.Id, e.Sport, e.NameOwner, e.NamePlayer, e.City, e.District, e.Address, e.StartDate, e.Duration, e.Cost))
                .ToList();

            return eventsViewModel;
        }
    }
}
