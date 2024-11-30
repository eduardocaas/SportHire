using MediatR;
using SportHire.Events.Core.Enums;
using SportHire.Events.Core.Repositories;

namespace SportHire.Events.Application.Commands.ConfirmEvent
{
    public class ConfirmEventCommandHandler : IRequestHandler<ConfirmEventCommand, EventConfirmEnum>
    {
        private readonly IEventRepository _repository;

        public ConfirmEventCommandHandler(IEventRepository repository)
        {
            _repository = repository;
        }

        public async Task<EventConfirmEnum> Handle(ConfirmEventCommand request, CancellationToken cancellationToken)
        {
            return await _repository.Confirm(request.Id, request.UserProfile);
        }
    }
}
