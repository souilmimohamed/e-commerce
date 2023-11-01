using Infrastructure.Data.Entities;
using Infrastructure.Interfaces;


namespace Infrastructure.Services
{
    public class UserService : IUserService
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<User> GetLoggedInUser(int id)
        {
            return await _unitOfWork.userRepository.GetUserById(id);
        }
    }
}
