using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Core.Handlers
{
    public class UpdateUserHandler : Ihandle<User, ResponseModel<UserDto>>
    {
        private readonly User _user;
        private readonly IUnitOfWork _unitOfWork;
        private readonly RegisterUserDto _data;

        public UpdateUserHandler(User user, IUnitOfWork unitOfWork, RegisterUserDto data)
        {
            _user = user;
            _unitOfWork = unitOfWork;
            _data = data;
        }
        public async Task<ResponseModel<UserDto>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
            {
                return validationResponse;
            }

            var user = await _unitOfWork.userRepository.GetUserById(_user.Id);

            using var hmac = new HMACSHA512();
            user.Username = _data.Username;
            user.Email = _data.Email;
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(_data.Password));
            user.PasswordSalt = hmac.Key;

            var response = await _unitOfWork.userRepository.UpdateUser(user);
            if (!await _unitOfWork.Complete())
                return ResponseModel<UserDto>.FailureResponse("Error updating user");
            return ResponseModel<UserDto>.SuccessResponse(response);
        }

        public async Task<ResponseModel<UserDto>> ValidateAsync()
        {
            if (_user == null)
                return ResponseModel<UserDto>.AccessDeniedResponse();
            var user = await _unitOfWork.userRepository.GetUserById(_user.Id);
            if (user == null)
                return ResponseModel<UserDto>.FailureResponse("user not found");
            return ResponseModel<UserDto>.SuccessResponse();
        }
    }
}
