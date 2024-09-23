using SportHire.Identity.Core.Entities;

namespace SportHire.Identity.Core.Repositories
{
    public interface IUserRepository
    {
        Task AddAsync(User user);
        Task<User> GetByEmailAndPasswordAsync(string email, string passwordHash);
        Task<User> GetByIdAsync(Guid id);
    }
}
