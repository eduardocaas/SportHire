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
        Task<List<Event>> GetAllByPlayerAsync(string emailPlayer);
        Task<bool> UpdateAsync(string id, Event _event);
        Task<bool> CancelAsync(string id);
        Task<bool> UpdatePlayerAsync(string id, string namePlayer, string emailPlayer);
        Task<EventConfirmEnum> Confirm(string id, UserProfileEnum profile);
    }
}
