using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool InStock { get; set; }
        public DateTime TimeStamp { get; set; }
        public Brand Brand { get; set; }
        public Category Category { get; set; }
        public string PhotoUrl { get; set; }
    }
}
