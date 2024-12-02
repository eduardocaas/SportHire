using MediatR;
using SportHire.Events.Core.Repositories;

namespace SportHire.Events.Application.Commands.QuitEvent
{
    public class QuitEventCommandHandler : IRequestHandler<QuitEventCommand, int>
    {
        private readonly IEventRepository _repository;

        public QuitEventCommandHandler(IEventRepository repository)
        {
            _repository = repository;
        }

        public async Task<int> Handle(QuitEventCommand request, CancellationToken cancellationToken)
        {
            return await _repository.QuitAsync(request.Id, request.UserProfile);
        }
    }
}
