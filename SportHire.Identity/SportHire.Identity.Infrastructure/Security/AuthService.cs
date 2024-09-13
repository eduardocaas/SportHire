using SportHire.Identity.Infrastructure.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SportHire.Identity.Infrastructure.Security
{
    public class AuthService : IAuthService
    {
        public string GenerateSha256Hash(string password)
        {
            throw new NotImplementedException();
        }
    }
}
