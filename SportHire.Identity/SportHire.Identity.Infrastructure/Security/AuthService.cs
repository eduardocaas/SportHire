using SportHire.Identity.Infrastructure.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace SportHire.Identity.Infrastructure.Security
{
    public class AuthService : IAuthService
    {
        public string GenerateSha256Hash(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                // create sha256 hash 
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

                StringBuilder builder = new StringBuilder();
                // convert byte array to string
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }

                // return hashed password string
                return builder.ToString();
            }
        }
    }
}
