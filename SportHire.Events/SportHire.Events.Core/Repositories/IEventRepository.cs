using SportHire.Events.Core.Entities;
using SportHire.Events.Core.Enums;

namespace SportHire.Events.Core.Repositories
{
    public interface IEventRepository
    {
        Task<List<Event>> GetAllByCityAndSportAsync(string city, EventSportEnum sport);
        Task<List<Event>> GetAllByOwnerAsync(string ownerEmail);
        Task AddAsync(Event _event);
    }
}
