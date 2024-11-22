using MediatR;
using SportHire.Events.Core.Entities;
using SportHire.Events.Core.Repositories;

namespace SportHire.Events.Application.Commands.CreateEvent
{
    public class CreateEventCommandHandler : IRequestHandler<CreateEventCommand, int>
    {
        private readonly IEventRepository _repository;

        public CreateEventCommandHandler(IEventRepository repository)
        {
            _repository = repository;
        }

        public async Task<int> Handle(CreateEventCommand request, CancellationToken cancellationToken)
        {
            var _event = new Event(request.EmailOwner, request.NameOwner, request.Sport, request.Uf, request.City, request.District, request.Address, request.StartDate, request.Duration, request.Observation);
            await _repository.AddAsync(_event);
            return 1; // TODO: Retornar string -> ver se funciona consulta direta -> return _event.Id
        }
    }
}
