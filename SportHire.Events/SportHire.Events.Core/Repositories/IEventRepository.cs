using SportHire.Events.Core.Entities;
using SportHire.Events.Core.Enums;

namespace SportHire.Events.Core.Repositories
{
    public interface IEventRepository
    {
        Task AddAsync(Event _event);
        Task<List<Event>> GetAllByCityAndSportAsync(string city, EventSportEnum sport, string email);
        Task<List<Event>> GetAllByCityAsync(string city, string email);
        Task<List<Event>> GetAllByOwnerAsync(string ownerEmail);
        Task<bool> UpdateAsync(string id, Event _event);
    }
}
