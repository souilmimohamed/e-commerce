using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace Core.Handlers
{
    public class RegisterUserHandler : Ihandle<User, ResponseModel<LoginResponseDto>>
    {
        private readonly User _user;
        private readonly RegisterUserDto _data;
        private readonly ITokenService _tokenService;
        private readonly IUnitOfWork _unitOfWork;

        public RegisterUserHandler(User user, RegisterUserDto data, ITokenService tokenService, IUnitOfWork unitOfWork)
        {
            _user = user;
            _data = data;
            _tokenService = tokenService;
            _unitOfWork = unitOfWork;
        }
        public async Task<ResponseModel<LoginResponseDto>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
            {
                return validationResponse;
            }

            using var hmac = new HMACSHA512();
            var user = new User
            {
                Username = _data.Username,
                Email = _data.Email,
                TiemStamp = DateTime.UtcNow,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(_data.Password)),
                PasswordSalt = hmac.Key
            };
            await _unitOfWork.userRepository.AddUser(user);
            var response = new LoginResponseDto
            {
                Email = _data.Email,
                Username = _data.Username,
                Token = await _tokenService.CreateToken(user),
            };
            if (!await _unitOfWork.Complete())
                return ResponseModel<LoginResponseDto>.FailureResponse("Error registring user");
            return ResponseModel<LoginResponseDto>.SuccessResponse(response);
        }

        public async Task<ResponseModel<LoginResponseDto>> ValidateAsync()
        {
            //if (_user == null)
            //    return ResponseModel<IEnumerable<Product>>.AccessDeniedResponseAsync();
            var emailExsit = await _unitOfWork.userRepository.GetUserByEmail(_data.Email);
            if (emailExsit != null)
                return ResponseModel<LoginResponseDto>.FailureResponse("Email already in use");
            return ResponseModel<LoginResponseDto>.SuccessResponse();
        }
    }
}
