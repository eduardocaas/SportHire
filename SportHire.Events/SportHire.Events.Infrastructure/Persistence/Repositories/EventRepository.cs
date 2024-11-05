using MongoDB.Driver;
using SportHire.Events.Core.Entities;
using SportHire.Events.Core.Enums;
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

        public async Task AddAsync(Event _event)
        {
            await _collection.InsertOneAsync(_event);
        }

        public async Task<List<Event>> GetAllByCityAndSportAsync(string city, EventSportEnum sport)
        {
            return await _collection.Find(e => e.City.ToLower() == city.ToLower() && e.Sport.Equals((int)sport)).ToListAsync();
        }

        public async Task<List<Event>> GetAllByCityAsync(string city)
        {
            return await _collection.Find(e => e.City.ToLower() == city.ToLower()).ToListAsync();
        }

        public async Task<List<Event>> GetAllByOwnerAsync(string ownerEmail)
        {
            return await _collection.Find(e => e.EmailOwner.Equals(ownerEmail, StringComparison.OrdinalIgnoreCase)).ToListAsync();
        }
    }
}
