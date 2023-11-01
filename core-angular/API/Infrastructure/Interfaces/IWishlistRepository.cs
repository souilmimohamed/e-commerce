using Infrastructure.Data.Entities;


namespace Infrastructure.Interfaces
{
    public interface IWishlistRepository
    {
        Task<Wishlist> AddWishlistItem(Wishlist wishlistItem);
        Task<int> DeleteWishlistItem(int id);
        Task<IEnumerable<Wishlist>> GetUserWishlist(int userId);
        Task<bool> ProductInWishlist(int productId);
    }
}