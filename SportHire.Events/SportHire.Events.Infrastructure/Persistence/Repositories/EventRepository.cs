using SportHire.Events.Core.Entities;
using SportHire.Events.Core.Repositories;

namespace SportHire.Events.Infrastructure.Persistence.Repositories
{
    public class EventRepository : IEventRepository
    {
        public Task<List<Event>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}
