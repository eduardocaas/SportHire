using MongoDB.Driver;
using SportHire.Events.Core.Entities;
using SportHire.Events.Core.Repositories;

namespace SportHire.Events.Infrastructure.Persistence.Repositories
{
    public class EventRepository : IEventRepository
    {
        private readonly IMongoCollection<Event> _collection;
        public EventRepository(IMongoDatabase database)
        {
            _collection = database.GetCollection<Event>("events");
        }

        public Task<List<Event>> GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}
