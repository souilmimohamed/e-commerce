using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.Interfaces;

namespace Core.Handlers
{
    public class GetBrandsHandler : Ihandle<User, ResponseModel<IEnumerable<Brand>>>
    {
        private readonly User _user;
        private readonly IUnitOfWork _unitOfWork;

        public GetBrandsHandler(User user, IUnitOfWork unitOfWork)
        {
            _user = user;
            _unitOfWork = unitOfWork;
        }
        public async Task<ResponseModel<IEnumerable<Brand>>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
                return validationResponse;

            var response = await _unitOfWork.productsRepository.GetBrands();
            return ResponseModel<IEnumerable<Brand>>.SuccessResponse(response);
        }

        public Task<ResponseModel<IEnumerable<Brand>>> ValidateAsync()
        {
            return ResponseModel<IEnumerable<Brand>>.SuccessResponseAsync();
        }
    }
}