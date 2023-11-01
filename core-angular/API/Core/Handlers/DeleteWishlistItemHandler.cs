using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.Interfaces;


namespace Core.Handlers
{
    public class DeleteWishlistItemHandler : Ihandle<User, ResponseModel<int>>
    {
        private readonly User _user;
        private readonly IUnitOfWork _unitOfWork;
        private readonly int _data;

        public DeleteWishlistItemHandler(User user, IUnitOfWork unitOfWork, int data)
        {
            _user = user;
            _unitOfWork = unitOfWork;
            _data = data;
        }
        public async Task<ResponseModel<int>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
                return validationResponse;

            var response = await _unitOfWork.wishlistRepository.DeleteWishlistItem(_data);
            if (await _unitOfWork.Complete())
                return ResponseModel<int>.SuccessResponse(_data);
            return ResponseModel<int>.FailureResponse("Error deleting wishlist item.");
        }

        public async Task<ResponseModel<int>> ValidateAsync()
        {
            if (_user == null)
                return ResponseModel<int>.AccessDeniedResponse();
            return ResponseModel<int>.SuccessResponse();
        }
    }
}
