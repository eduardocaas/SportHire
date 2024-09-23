using SportHire.Identity.Core.Entities;

namespace SportHire.Identity.Core.Repositories
{
    public interface IUserRepository
    {
        Task AddAsync(User user);
        Task<User> GetUserByEmailAndPasswordAsync(string email, string passwordHash);
        Task<User> GetUserByIdAsync(int id);
    }
}
