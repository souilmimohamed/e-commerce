using AutoMapper;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;

namespace API.Helpers
{
    public class ProductUrlResolver : IValueResolver<Product, ProductDto, string>
    {
        private readonly IConfiguration _configuration;

        public ProductUrlResolver(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public string Resolve(Product source, ProductDto destination, string destMember, ResolutionContext context)
        {
            if (!source.PhotoUrl.StringIsNullOrEmptyOrWhiteSpaces())
                return _configuration["ApiUrl"] + source.PhotoUrl;
            return null;
        }
    }
}
