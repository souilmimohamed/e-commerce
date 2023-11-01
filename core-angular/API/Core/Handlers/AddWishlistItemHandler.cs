using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;

namespace Core.Handlers
{
    public class AddWishlistItemHandler : Ihandle<User, ResponseModel<WishlistDto>>
    {
        private readonly User _user;
        private readonly IUnitOfWork _unitOfWork;
        private readonly int _data;

        public AddWishlistItemHandler(User user, IUnitOfWork unitOfWork, int data)
        {
            _user = user;
            _unitOfWork = unitOfWork;
            _data = data;
        }
        public async Task<ResponseModel<WishlistDto>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
                return validationResponse;

            var wishlistItem = new Wishlist
            {
                ProductId = _data,
                UserId = _user.Id,
            };
            var wishlist = await _unitOfWork.wishlistRepository.AddWishlistItem(wishlistItem);
            await _unitOfWork.Complete();
            var product = await _unitOfWork.productsRepository.GetProduct(wishlist.ProductId);
            var response = new WishlistDto
            {
                Id = product.Id,
                BrandName = product.BrandName,
                Categoryname = product.Categoryname,
                Description = product.Description,
                InStock = product.InStock,
                Name = product.Name,
                PhotoUrl = product.PhotoUrl,
                Price = product.Price,
                WishlistItemId = wishlist.Id,
            };
            return ResponseModel<WishlistDto>.SuccessResponse(response);
        }

        public async Task<ResponseModel<WishlistDto>> ValidateAsync()
        {
            if (_user == null)
                return ResponseModel<WishlistDto>.AccessDeniedResponse();
            var product = await _unitOfWork.productsRepository.GetProduct(_data);
            if (product == null)
                return ResponseModel<WishlistDto>.FailureResponse("product not found.");
            var productInWishlist = await _unitOfWork.wishlistRepository.ProductInWishlist(_data);
            if (productInWishlist)
                return ResponseModel<WishlistDto>.FailureResponse("item is already in your wishlist");
            return ResponseModel<WishlistDto>.SuccessResponse();
        }
    }
}
