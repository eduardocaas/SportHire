using MediatR;
using SportHire.Events.Core.Repositories;

namespace SportHire.Events.Application.Commands.PlayerHireEvent
{
    public class PlayerHireEventCommandHandler : IRequestHandler<PlayerHireEventCommand, bool>
    {
        private readonly IEventRepository _repository;

        public PlayerHireEventCommandHandler(IEventRepository repository)
        {
            _repository = repository;
        }

        public async Task<bool> Handle(PlayerHireEventCommand request, CancellationToken cancellationToken)
        {
            return await _repository.UpdatePlayerAsync(request.EventId, request.NamePlayer, request.EmailPlayer);
        }
    }
}
