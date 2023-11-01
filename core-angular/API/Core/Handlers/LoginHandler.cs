using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;
using System.Security.Cryptography;
using System.Text;

namespace Core.Handlers
{
    public class LoginHandler : Ihandle<User, ResponseModel<LoginResponseDto>>
    {
        private readonly User _user;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;
        private readonly LoginDto _data;

        public LoginHandler(User user, IUnitOfWork unitOfWork, ITokenService tokenService, LoginDto data)
        {
            _user = user;
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
            _data = data;
        }
        public async Task<ResponseModel<LoginResponseDto>> HandleAsync()
        {
            var valiationResponse = await ValidateAsync();
            if (!valiationResponse.Success)
                return valiationResponse;

            var user = await _unitOfWork.userRepository.GetUserByEmail(_data.Email);
            var paswordMatch = verifyPassword(user, _data.Password);
            if (!paswordMatch)
                return ResponseModel<LoginResponseDto>.WrongPasswordResponse();

            var response = new LoginResponseDto
            {
                Email = user.Email,
                Username = user.Username,
                Token = await _tokenService.CreateToken(user),
            };
            return ResponseModel<LoginResponseDto>.SuccessResponse(response);
        }

        public async Task<ResponseModel<LoginResponseDto>> ValidateAsync()
        {
            var user = await _unitOfWork.userRepository.GetUserByEmail(_data.Email);
            if (user == null)
                return ResponseModel<LoginResponseDto>.FailureResponse("username incorrect");
            return ResponseModel<LoginResponseDto>.SuccessResponse();
        }
        private bool verifyPassword(User user, string password)
        {
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i])
                    return false;
            }
            return true;
        }
    }
}
