using AutoMapper;
using Infrastructure.Interfaces;

namespace Infrastructure.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public IProductsRepository productsRepository => new ProductsRepository(_context, _mapper);

        public IUserRepository userRepository => new UsersRepository(_context, _mapper);
        public IWishlistRepository wishlistRepository => new WishlistRepository(_context);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}
