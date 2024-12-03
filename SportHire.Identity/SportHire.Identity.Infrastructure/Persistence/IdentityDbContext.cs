using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SportHire.Identity.Core.Entities;
using System.Reflection;

namespace SportHire.Identity.Infrastructure.Persistence
{
    public class IdentityDbContext : DbContext
    {
        private readonly string _connectionString;

        public IdentityDbContext(IConfiguration configuration)
        {
            this._connectionString = configuration.GetConnectionString("PostgresConnection");
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Wallet> Wallets { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql(this._connectionString);

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }

        internal async Task SaveChangesAsync(User user)
        {
            throw new NotImplementedException();
        }
    }
}
