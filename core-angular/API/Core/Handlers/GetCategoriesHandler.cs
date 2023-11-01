

using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.Interfaces;

namespace Core.Handlers
{
    public class GetCategoriesHandler : Ihandle<User, ResponseModel<IEnumerable<Category>>>
    {
        private readonly User _user;
        private readonly IUnitOfWork _unitOfWork;

        public GetCategoriesHandler(User user, IUnitOfWork unitOfWork)
        {
            _user = user;
            _unitOfWork = unitOfWork;
        }
        public async Task<ResponseModel<IEnumerable<Category>>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
                return validationResponse;

            var response = await _unitOfWork.productsRepository.GetCategories();
            return ResponseModel<IEnumerable<Category>>.SuccessResponse(response);
        }

        public Task<ResponseModel<IEnumerable<Category>>> ValidateAsync()
        {
            return ResponseModel<IEnumerable<Category>>.SuccessResponseAsync();
        }
    }
}
