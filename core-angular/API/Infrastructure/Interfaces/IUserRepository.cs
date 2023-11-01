using Infrastructure.Data.Entities;
using Infrastructure.DTOs;

namespace Infrastructure.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserDto>> GetUsers();
        Task<User> GetUserById(int id);
        Task<User> GetUserByEmail(string email);
        Task<User> AddUser(User user);
        Task<UserDto> UpdateUser(User user);
        Task<User> DeleteUser(int id);
    }
}
