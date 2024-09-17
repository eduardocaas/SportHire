using SportHire.Identity.Core.Entities;
using SportHire.Identity.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportHire.Identity.Infrastructure.Persistence.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IdentityDbContext _dbContext;

        public UserRepository(IdentityDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddAsync(User user)
        {
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
        }

        public Task<User> GetUserByEmailAndPasswordAsync(string email, string passwordHash)
        {
            throw new NotImplementedException();
        }
    }
}
