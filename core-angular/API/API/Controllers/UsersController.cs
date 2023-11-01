using API.Extensions;
using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers
{
    [Area("Identity")]
    [Route("api/[area]/[controller]/[action]")]
    [ApiController]
    public class UsersController : Controller
    {
        private const string MODULE = "Commerce";
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;

        public UsersController(IUnitOfWork unitOfWork, ITokenService tokenService, IUserService userService)
        {
            _unitOfWork = unitOfWork;
            _tokenService = tokenService;
            _userService = userService;
        }
        [Authorize]
        [HttpGet]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<IEnumerable<UserDto>>), 200)]
        public async Task<ActionResult<ResponseModel<IEnumerable<UserDto>>>> getUsers()
        {
            try
            {
                var response = await new Core.Handlers.GetUsersHandler(await _userService.GetLoggedInUser(User.GetUserId()), _unitOfWork)
                    .HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<LoginResponseDto>), 200)]
        public async Task<ActionResult<ResponseModel<LoginResponseDto>>> RegisterUser(RegisterUserDto data)
        {
            try
            {
                var response = await new Core.Handlers.RegisterUserHandler(new Infrastructure.Data.Entities.User { }, data,
                    _tokenService, _unitOfWork).HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Authorize]
        [HttpPost]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<LoginResponseDto>), 200)]
        public async Task<ActionResult<ResponseModel<UserDto>>> UpdateUser(RegisterUserDto data)
        {
            try
            {
                var response = await new Core.Handlers.UpdateUserHandler(await _userService.GetLoggedInUser(User.GetUserId()), _unitOfWork, data)
                    .HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<LoginResponseDto>), 200)]
        public async Task<ActionResult<ResponseModel<LoginResponseDto>>> Login(LoginDto data)
        {
            try
            {
                var response = await new Core.Handlers.LoginHandler(new Infrastructure.Data.Entities.User { }
                , _unitOfWork, _tokenService, data)
                    .HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Authorize]
        [HttpGet]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<Wishlist>), 200)]
        public async Task<ActionResult<ResponseModel<int>>> AddWishlistItem(int productId)
        {
            try
            {
                var response = await new Core.Handlers.AddWishlistItemHandler(
                    await _userService.GetLoggedInUser(User.GetUserId())
                    , _unitOfWork
                    , productId).HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Authorize]
        [HttpGet]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<int>), 200)]
        public async Task<ActionResult<ResponseModel<int>>> DeleteWishlistItem(int wishlistItemId)
        {
            try
            {
                var response = await new Core.Handlers.DeleteWishlistItemHandler(
                    await _userService.GetLoggedInUser(User.GetUserId())
                    , _unitOfWork
                    , wishlistItemId).HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Authorize]
        [HttpGet]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<IEnumerable<ProductDto>>), 200)]
        public async Task<ActionResult<ResponseModel<IEnumerable<WishlistDto>>>> GetUserWishlist()
        {
            try
            {
                var response = await new Core.Handlers.GetUserWishlitHandler(await _userService.GetLoggedInUser(User.GetUserId())
                    , _unitOfWork)
                    .HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}