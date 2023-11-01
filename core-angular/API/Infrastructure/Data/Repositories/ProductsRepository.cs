using AutoMapper;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Helpers;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories
{
    public class ProductsRepository : IProductsRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProductsRepository(DataContext _context, IMapper mapper)
        {
            this._context = _context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Brand>> GetBrands()
        {
            return await _context.Brands.ToListAsync();
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        public async Task<ProductDto> GetProduct(int id)
        {

            var product = await _context.Products
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.Id == id);
            return _mapper.Map<Product, ProductDto>(product);
        }
        public async Task<IPagination<ProductDto>> GetProducts(ProductParams productParams)
        {
            var query = _context.Products
            .Include(p => p.Brand)
            .Include(p => p.Category)
            .AsQueryable();

            if (!productParams.SearchText.StringIsNullOrEmptyOrWhiteSpaces())
                query = query.Where(p => p.Name.ToLower().Contains(productParams.SearchText.ToLower()));
            if (!productParams.Brand.StringIsNullOrEmptyOrWhiteSpaces())
                query = query.Where(p => p.Brand.BrandName.ToLower() == productParams.Brand.ToLower());
            if (!productParams.Category.StringIsNullOrEmptyOrWhiteSpaces())
                query = query.Where(p => p.Category.CategoryName.ToLower() == productParams.Category.ToLower());

            query = productParams.SortPrice switch
            {
                "DESC" => query.OrderByDescending(p => p.Price),
                "ASC" => query.OrderBy(p => p.Price),
                _ => query,
            };

            var Items = _mapper.Map<IEnumerable<ProductDto>>(await query.ToListAsync());
            var data = IPagination<ProductDto>.GetPagination(
                Items,
                productParams.PageNumer,
                productParams.PageSize);
            return data;
        }

        public async Task<IEnumerable<ProductDto>> GetProductsByIds(List<int> ids)
        {
            var products = await _context.Products.Where(p => ids.Contains(p.Id)).ToListAsync();
            return _mapper.Map<IEnumerable<ProductDto>>(products);
        }
    }
}