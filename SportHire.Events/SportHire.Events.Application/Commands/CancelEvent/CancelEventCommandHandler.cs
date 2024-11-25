using MediatR;
using SportHire.Events.Core.Repositories;

namespace SportHire.Events.Application.Commands.CancelEvent
{
    public class CancelEventCommandHandler : IRequestHandler<CancelEventCommand, bool>
    {
        private readonly IEventRepository _repository;

        public CancelEventCommandHandler(IEventRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(CancelEventCommand request, CancellationToken cancellationToken)
        {
            return await _repository.CancelAsync(request.Id);
        }
    }
}
