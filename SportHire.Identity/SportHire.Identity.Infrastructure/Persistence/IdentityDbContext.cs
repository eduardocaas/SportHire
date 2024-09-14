using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace SportHire.Identity.Infrastructure.Persistence
{
    public class IdentityDbContext : DbContext
    {
        private readonly string _connectionString;

        public IdentityDbContext(IConfiguration configuration)
        {
            this._connectionString = configuration.GetConnectionString("PostgresConnection");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql(this._connectionString);
    }
}
