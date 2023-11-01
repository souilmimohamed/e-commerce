using Infrastructure.Data.Entities;

namespace Infrastructure.Interfaces
{
    public interface IUserService
    {
        Task<User> GetLoggedInUser(int id);
    }
}
