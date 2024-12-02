using MediatR;
using SportHire.Events.Core.Repositories;

namespace SportHire.Events.Application.Commands.QuitEvent
{
    public class QuitEventCommandHandler : IRequestHandler<QuitEventCommand, bool>
    {
        private readonly IEventRepository _repository;

        public QuitEventCommandHandler(IEventRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(QuitEventCommand request, CancellationToken cancellationToken)
        {
            return await _repository.QuitAsync(request.Id);
        }
    }
}
