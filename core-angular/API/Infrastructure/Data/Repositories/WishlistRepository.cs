using Infrastructure.Data.Entities;
using Infrastructure.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data.Repositories
{
    public class WishlistRepository : IWishlistRepository
    {
        private readonly DataContext _context;

        public WishlistRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Wishlist> AddWishlistItem(Wishlist wishlistItem)
        {
            await _context.Wishlist.AddAsync(wishlistItem);
            return wishlistItem;
        }
        public async Task<int> DeleteWishlistItem(int id)
        {
            var wishlistItem = _context.Wishlist.Where(w => w.Id == id).FirstOrDefault();
            _context.Wishlist.Remove(wishlistItem);
            return 1;
        }

        public async Task<IEnumerable<Wishlist>> GetUserWishlist(int userId)
        {
            var wishlist = await _context.Wishlist.Where(w => w.UserId == userId).ToListAsync();
            return wishlist;
        }

        public async Task<bool> ProductInWishlist(int productId)
        {
            var productInWishlist = await _context.Wishlist.Where(w => w.ProductId == productId).ToListAsync();
            return productInWishlist != null && productInWishlist.Count > 0;
        }
    }
}
