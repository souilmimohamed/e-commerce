

namespace Infrastructure.DTOs
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool InStock { get; set; }
        public string BrandName { get; set; }
        public string Categoryname { get; set; }
        public string PhotoUrl { get; set; }
    }
}
