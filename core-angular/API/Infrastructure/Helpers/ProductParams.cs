using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Helpers
{
    public class ProductParams : IPaginationParams
    {
        public string SearchText { get; set; }
        public string Category { get; set; }
        public string Brand { get; set; }
        public string SortPrice { get; set; } = "DESC";
    }
}
