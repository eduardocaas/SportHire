using MediatR;
using SportHire.Events.Core.Entities;
using SportHire.Events.Core.Repositories;

namespace SportHire.Events.Application.Commands.UpdateEvent
{
    public class UpdateEventCommandHandler : IRequestHandler<UpdateEventCommand, bool>
    {
        private readonly IEventRepository _repository;

        public UpdateEventCommandHandler(IEventRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(UpdateEventCommand request, CancellationToken cancellationToken)
        {
            var _event = new Event(request.Id, request.District, request.Address, request.StartDate, request.Duration, request.Observation);
            var result = await _repository.UpdateAsync(request.IdRoute, _event);
            return result;
        }
    }
}
