using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;


namespace Core.Handlers
{
    public class GetUserWishlitHandler : Ihandle<User, ResponseModel<IEnumerable<WishlistDto>>>
    {
        private readonly User _user;
        private readonly IUnitOfWork _unitOfWork;

        public GetUserWishlitHandler(User user, IUnitOfWork unitOfWork)
        {
            _user = user;
            _unitOfWork = unitOfWork;
        }
        public async Task<ResponseModel<IEnumerable<WishlistDto>>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
                return validationResponse;

            var userWishlist = await _unitOfWork.wishlistRepository.GetUserWishlist(_user.Id);
            var productIds = userWishlist?.Select(x => x.ProductId).ToList();
            var products = await _unitOfWork.productsRepository.GetProductsByIds(productIds);
            var response = products.Select(p => new WishlistDto
            {
                BrandName = p.BrandName,
                Categoryname = p.Categoryname,
                Description = p.Description,
                Id = p.Id,
                InStock = p.InStock,
                Name = p.Name,
                PhotoUrl = p.PhotoUrl,
                Price = p.Price,
                WishlistItemId = userWishlist.FirstOrDefault(w => w.ProductId == p.Id).Id
            });
            return ResponseModel<IEnumerable<WishlistDto>>.SuccessResponse(response);
        }

        public async Task<ResponseModel<IEnumerable<WishlistDto>>> ValidateAsync()
        {
            if (_user == null)
                return ResponseModel<IEnumerable<WishlistDto>>.AccessDeniedResponse();
            return ResponseModel<IEnumerable<WishlistDto>>.SuccessResponse();
        }
    }
}
