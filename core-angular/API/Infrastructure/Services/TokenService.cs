using Infrastructure.Data.Entities;
using Infrastructure.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration configuration)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"]));
        }
        public async Task<string> CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.UniqueName,user.Username),
                new Claim(JwtRegisteredClaimNames.NameId,user.Id.ToString())
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha256Signature);
            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
            };
            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(descriptor);
            return handler.WriteToken(token);
        }
    }
}
