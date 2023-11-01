using Core.Common;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Helpers;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace API.Controllers
{
    [Area("Commerce")]
    [Route("api/[area]/[controller]/[action]")]
    [ApiController]
    public class ProductController : Controller
    {
        private const string MODULE = "Commerce";
        private readonly IUnitOfWork _unitOfWork;

        public ProductController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpPost]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<IEnumerable<ProductDto>>), 200)]
        public async Task<ActionResult<IPagination<ProductDto>>> GetProducts(ProductParams data)
        {
            try
            {
                var response = await new Core.Handlers.GetProductsHandler(_unitOfWork, null, data).HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<ProductDto>), 200)]
        public async Task<ActionResult<ProductDto>> GetProductById(int id)
        {
            try
            {
                var response = await new Core.Handlers.GetProductByIdHandler(new Infrastructure.Data.Entities.User { }, _unitOfWork, id).HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<IEnumerable<Brand>>), 200)]
        public async Task<ActionResult<IEnumerable<Brand>>> GetBrands()
        {
            try
            {
                var response = await new Core.Handlers.GetBrandsHandler(null, _unitOfWork).HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet]
        [SwaggerOperation(Tags = new[] { MODULE })]
        [ProducesResponseType(typeof(ResponseModel<IEnumerable<Category>>), 200)]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            try
            {
                var response = await new Core.Handlers.GetCategoriesHandler(null, _unitOfWork).HandleAsync();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
