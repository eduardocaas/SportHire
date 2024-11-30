using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using SportHire.Events.Core.Entities;
using SportHire.Events.Core.Enums;
using SportHire.Events.Core.Exceptions;
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

        public async Task<List<Event>> GetAllByPlayerAsync(string emailPlayer)
        {
            return await _collection
                .Find(e =>
                    e.EmailPlayer.Equals(emailPlayer, StringComparison.OrdinalIgnoreCase))
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

        public async Task<bool> UpdatePlayerAsync(string id, string namePlayer, string emailPlayer)
        {

            var playerEventCount = await _collection.CountDocumentsAsync(Builders<Event>.Filter.And(
                Builders<Event>.Filter.Eq(e => e.EmailPlayer, emailPlayer),
                Builders<Event>.Filter.Eq(e => e.Status, EventStatusEnum.ANDAMENTO)
            ));

            if (playerEventCount >= 5)
            {
                throw new PlayerExceededLimitException("Você excedeu o limite de 5 eventos em andamento.");
            }

            var eventToJoin = await _collection.Find(Builders<Event>.Filter.Eq(e => e.Id, id)).FirstOrDefaultAsync();

            if (eventToJoin == null)
            {
                throw new ArgumentException($"Evento com ID '{id}' não encontrado.");
            }

            var conflictingEvent = await _collection.Find(Builders<Event>.Filter.And(
                Builders<Event>.Filter.Eq(e => e.Status, EventStatusEnum.ANDAMENTO),
                Builders<Event>.Filter.Eq(e => e.EmailPlayer, emailPlayer),
                Builders<Event>.Filter.Or(
                    Builders<Event>.Filter.And(
                        Builders<Event>.Filter.Lte(e => e.StartDate, eventToJoin.StartDate),
                        Builders<Event>.Filter.Gte(e => e.EndDate, eventToJoin.StartDate)
                    ),
                    Builders<Event>.Filter.And(
                        Builders<Event>.Filter.Lte(e => e.StartDate, eventToJoin.EndDate),
                        Builders<Event>.Filter.Gte(e => e.EndDate, eventToJoin.EndDate)
                    ),
                    Builders<Event>.Filter.And(
                        Builders<Event>.Filter.Gte(e => e.StartDate, eventToJoin.StartDate),
                        Builders<Event>.Filter.Lte(e => e.EndDate, eventToJoin.EndDate)
                    )
                )
            )).FirstOrDefaultAsync();

            if (conflictingEvent != null)
            {
                throw new PlayerConflictDateException("Você já está inscrito em um evento na mesma data e horário");
            }

            var filter = Builders<Event>
                .Filter
                .Eq(e => e.Id, id);

            var update = Builders<Event>.Update
                .Set(e => e.NamePlayer, namePlayer)
                .Set(e => e.EmailPlayer, emailPlayer)
                .Set(e => e.Status, EventStatusEnum.ANDAMENTO);

            var options = new UpdateOptions { IsUpsert = false };
            var result = await _collection.UpdateOneAsync(filter, update, options);

            return result.ModifiedCount > 0;
        }

        public async Task<EventConfirmEnum> Confirm(string id, UserProfileEnum profile)
        {
            EventConfirmEnum eventConfirm = EventConfirmEnum.DEFAULT;

            var filter = Builders<Event>
                .Filter
                .Eq(e => e.Id, id);

            var event_ = await _collection.Find(filter).FirstOrDefaultAsync();

            UpdateDefinition<Event> update = null;

            if (profile == UserProfileEnum.OWNER)
            {
                if (event_.ConfirmPlayer == true)
                {
                    update = Builders<Event>.Update
                        .Set(e => e.ConfirmOwner, true)
                        .Set(e => e.Confirm, true)
                        .Set(e => e.Status, EventStatusEnum.CONCLUIDO); 

                    eventConfirm = EventConfirmEnum.CONFIRMED;
                }
                else
                {
                    update = Builders<Event>.Update
                        .Set(e => e.ConfirmOwner, true);

                    eventConfirm = EventConfirmEnum.ONLY_OWNER_CONFIRMED;
                }
            }
            if (profile == UserProfileEnum.PLAYER) {
                if (event_.ConfirmOwner == true)
                {
                    update = Builders<Event>.Update
                        .Set(e => e.ConfirmPlayer, true)
                        .Set(e => e.Confirm, true)
                        .Set(e => e.Status, EventStatusEnum.CONCLUIDO);

                    eventConfirm = EventConfirmEnum.CONFIRMED;
                }
                else
                {
                    update = Builders<Event>.Update
                        .Set(e => e.ConfirmPlayer, true);

                    eventConfirm = EventConfirmEnum.ONLY_PLAYER_CONFIRMED;
                }
            }

            var options = new UpdateOptions { IsUpsert = false };
            var result = await _collection.UpdateOneAsync(filter, update, options);
            
            return eventConfirm;
        }
    }
}
