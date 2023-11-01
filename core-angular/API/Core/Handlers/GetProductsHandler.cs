using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Helpers;
using Infrastructure.Interfaces;

namespace Core.Handlers
{
    public class GetProductsHandler : Ihandle<User, ResponseModel<IPagination<ProductDto>>>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ProductParams _data;

        private User _user { get; set; }
        public GetProductsHandler(IUnitOfWork unitOfWork, User user, ProductParams data)
        {
            _unitOfWork = unitOfWork;
            _user = user;
            _data = data;
        }

        public async Task<ResponseModel<IPagination<ProductDto>>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
            {
                return validationResponse;
            }

            var response = await _unitOfWork.productsRepository.GetProducts(_data);
            return ResponseModel<IPagination<ProductDto>>.SuccessResponse(response);
        }

        public Task<ResponseModel<IPagination<ProductDto>>> ValidateAsync()
        {
            //if (_user == null)
            //    return ResponseModel<IEnumerable<Product>>.AccessDeniedResponseAsync();
            return ResponseModel<IPagination<ProductDto>>.SuccessResponseAsync();
        }
    }
}
