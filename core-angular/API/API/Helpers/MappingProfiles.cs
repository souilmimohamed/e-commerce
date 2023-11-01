using API.Helpers;
using AutoMapper;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;

namespace API
{
    internal class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductDto>()
                .ForMember(p => p.BrandName, o => o.MapFrom(s => s.Brand.BrandName))
                .ForMember(p => p.Categoryname, o => o.MapFrom(s => s.Category.CategoryName))
                .ForMember(p => p.PhotoUrl, o => o.MapFrom<ProductUrlResolver>());
            CreateMap<User, UserDto>();
        }
    }
}