﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.DTOs
{
    public class WishlistDto : ProductDto
    {
        public int WishlistItemId { get; set; }
    }
}
