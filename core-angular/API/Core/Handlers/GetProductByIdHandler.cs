using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Handlers
{
    public class GetProductByIdHandler : Ihandle<User, ResponseModel<ProductDto>>
    {

        private User _user { get; set; }

        private readonly IUnitOfWork _unitOfWork;
        private int _data;
        public GetProductByIdHandler(User user, IUnitOfWork unitOfWork, int data)
        {
            _user = user;
            _unitOfWork = unitOfWork;
            _data = data;
        }
        public async Task<ResponseModel<ProductDto>> HandleAsync()
        {
            var validationResponse = await ValidateAsync();
            if (!validationResponse.Success)
            {
                return validationResponse;
            }

            var response = await _unitOfWork.productsRepository.GetProduct(_data);
            return ResponseModel<ProductDto>.SuccessResponse(response);
        }

        public Task<ResponseModel<ProductDto>> ValidateAsync()
        {
            //if (_user == null)
            //    return ResponseModel<IEnumerable<Product>>.AccessDeniedResponseAsync();
            return ResponseModel<ProductDto>.SuccessResponseAsync();
        }
    }
}
