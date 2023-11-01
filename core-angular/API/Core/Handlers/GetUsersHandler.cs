using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;

namespace Core.Handlers
{
    public class GetUsersHandler : Ihandle<User, ResponseModel<IEnumerable<UserDto>>>
    {
        private readonly User _user;
        private readonly IUnitOfWork _unitOfWork;

        public GetUsersHandler(User user, IUnitOfWork unitOfWork)
        {
            _user = user;
            _unitOfWork = unitOfWork;
        }
        public async Task<ResponseModel<IEnumerable<UserDto>>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
                return validationResponse;

            var response = await _unitOfWork.userRepository.GetUsers();
            return ResponseModel<IEnumerable<UserDto>>.SuccessResponse(response);
        }

        public Task<ResponseModel<IEnumerable<UserDto>>> ValidateAsync()
        {
            if (_user == null)
                return ResponseModel<IEnumerable<UserDto>>.AccessDeniedResponseAsync();
            return ResponseModel<IEnumerable<UserDto>>.SuccessResponseAsync();
        }
    }
}
