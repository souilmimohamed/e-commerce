

namespace Infrastructure.Interfaces
{
    public interface IUnitOfWork
    {
        IProductsRepository productsRepository { get; }
        IUserRepository userRepository { get; }
        IWishlistRepository wishlistRepository { get; }
        Task<bool> Complete();
        bool HasChanges();
    }
}
