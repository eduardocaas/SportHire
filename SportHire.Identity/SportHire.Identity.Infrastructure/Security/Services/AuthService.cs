using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
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

        public string GenerateJwtToken(string email)
        {
            var issuer = _configuration["Jwt:Issuer"];
            var audience = _configuration["Jwt:Audience"];

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, email)
            };

            var rsaKey = RSA.Create();
            rsaKey.ImportFromPem(_configuration["Jwt:PrivateKeyPath"]);

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
