using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Entities
{
    public class Wishlist
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public Product Product { get; set; }
        public User User { get; set; }
    }
}
