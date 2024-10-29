using MediatR;
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

        public Task<int> Handle(CreateEventCommand request, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
