using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Helpers;


namespace Infrastructure.Interfaces
{
    public interface IProductsRepository
    {
        Task<IPagination<ProductDto>> GetProducts(ProductParams productParams);
        Task<IEnumerable<ProductDto>> GetProductsByIds(List<int> ids);
        Task<ProductDto> GetProduct(int id);
        Task<IEnumerable<Brand>> GetBrands();
        Task<IEnumerable<Category>> GetCategories();
    }
}
