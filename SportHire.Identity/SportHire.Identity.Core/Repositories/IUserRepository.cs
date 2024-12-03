using SportHire.Identity.Core.Entities;

namespace SportHire.Identity.Core.Repositories
{
    public interface IUserRepository
    {
        Task AddAsync(User user);
        Task UpdateAsync(User user);
        Task<User> GetByEmailAsync(string email);
        Task<User> GetByEmailAndPasswordAsync(string email, string passwordHash);
        Task<User> GetByIdAsync(Guid id);
    }
}
