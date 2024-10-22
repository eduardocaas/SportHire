using SportHire.Events.Core.Entities;

namespace SportHire.Events.Core.Repositories
{
    public interface IEventRepository
    {
        Task<List<Event>> GetAllByOwnerAsync(string ownerEmail);
    }
}
