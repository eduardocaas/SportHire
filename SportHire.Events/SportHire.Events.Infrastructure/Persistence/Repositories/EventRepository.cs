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

        public async Task<List<Event>> GetAllByCityAndSportAsync(string city, EventSportEnum sport)
        {
            return await _collection.Find(e => e.City.Equals(city, StringComparison.OrdinalIgnoreCase) && e.Sport.Equals(sport)).ToListAsync();
        }

        public async Task<List<Event>> GetAllByOwnerAsync(string ownerEmail)
        {
            return await _collection.Find(e => e.EmailOwner.Equals(ownerEmail, StringComparison.OrdinalIgnoreCase)).ToListAsync();
        }
    }
}
