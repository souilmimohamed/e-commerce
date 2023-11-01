using Infrastructure.Data.Entities;

namespace Infrastructure.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(User user);
    }
}