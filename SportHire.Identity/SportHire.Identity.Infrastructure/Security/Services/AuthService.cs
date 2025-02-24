using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SportHire.Identity.Infrastructure.Security.Exceptions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace SportHire.Identity.Infrastructure.Security.Services
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;

        public AuthService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

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

        public string GenerateJwtToken(string email, string name)
        {
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Name, name)
            };

            var rsaKey = RSA.Create();
            string pemKey;

            try
            {
                pemKey = File.ReadAllText(_configuration.GetSection("Jwt:PrivateKeyPath").Value);
            }
            catch (FileNotFoundException ex) 
            {
                throw new PrivateKeyFileNotFoundException(ex);
            }

            try
            {
                rsaKey.ImportFromPem(pemKey);
            }
            catch (CryptographicException ex)
            {
                throw new InvalidPrivateKeyException(ex);
            }

            var rsaSecurityKey = new RsaSecurityKey(rsaKey);
            var signingCredentials = new SigningCredentials(rsaSecurityKey, SecurityAlgorithms.RsaSha256);

            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                expires: DateTime.Now.AddHours(8),
                signingCredentials: signingCredentials,
                claims: claims);

            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenString;
        }
    }
}
