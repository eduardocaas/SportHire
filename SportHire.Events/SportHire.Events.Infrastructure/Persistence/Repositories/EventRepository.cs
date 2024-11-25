﻿using MongoDB.Driver;
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

        public async Task<List<Event>> GetAllByCityAndSportAsync(string city, EventSportEnum sport, string email)
        {
            return await _collection
                .Find(e => 
                    e.City.ToLower() == city.ToLower() && 
                    e.Sport.Equals((int)sport) && 
                    e.Status == EventStatusEnum.ABERTO &&
                    e.EmailOwner != email)
                .SortBy(e => 
                    e.StartDate)
                .ToListAsync();
        }

        public async Task<List<Event>> GetAllByCityAsync(string city, string email)
        {
            return await _collection
                .Find(e => 
                    e.City.ToLower() == city.ToLower() && 
                    e.Status == EventStatusEnum.ABERTO &&
                    e.EmailOwner != email)
                .SortBy(e => 
                    e.StartDate)
                .ToListAsync();
        }

        public async Task<List<Event>> GetAllByOwnerAsync(string ownerEmail)
        {
            return await _collection
                .Find(e =>
                    e.EmailOwner.Equals(ownerEmail, StringComparison.OrdinalIgnoreCase))
                .SortBy(e =>
                    e.StartDate)
                .ToListAsync();
        }

        public async Task<bool> UpdateAsync(string id, Event _event)
        {
            var filter = Builders<Event>
                .Filter
                .Eq(e => e.Id, id);

            var update = Builders<Event>.Update
                .Set(e => e.District, _event.District)
                .Set(e => e.Address, _event.Address)
                .Set(e => e.StartDate, _event.StartDate)
                .Set(e => e.Duration, _event.Duration)
                .Set(e => e.Observation, _event.Observation);

            var options = new UpdateOptions { IsUpsert = false };
            var result = await _collection.UpdateOneAsync(filter, update, options);

            return result.ModifiedCount > 0;
        }

        public async Task<bool> CancelAsync(string id)
        {
            var filter = Builders<Event>
                .Filter
                .Eq(e => e.Id, id);

            var update = Builders<Event>.Update
                .Set(e => e.Status, EventStatusEnum.CANCELADO);

            var options = new UpdateOptions { IsUpsert = false };
            var result = await _collection.UpdateOneAsync(filter, update, options);

            return result.ModifiedCount > 0;
        }
    }
}
