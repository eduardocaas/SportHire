using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportHire.Identity.Infrastructure.Persistence
{
    public class IdentityDbContext : DbContext
    {
        private readonly string _connectionString;

        public IdentityDbContext(IConfiguration configuration)
        {
            this._connectionString = configuration.GetConnectionString("PostgresConnection");
        }
    }
}
