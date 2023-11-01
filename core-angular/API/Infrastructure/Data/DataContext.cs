using Infrastructure.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Wishlist> Wishlist { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Brand)
                .WithMany()
                .HasForeignKey(p => p.BrandId);

            modelBuilder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany()
                .HasForeignKey(p => p.CategoryId);

            modelBuilder.Entity<Wishlist>()
                .HasOne(w => w.User)
                .WithMany(u => u.WishlistItems)
                .HasForeignKey(w => w.UserId);

            modelBuilder.Entity<Wishlist>()
                 .HasOne(w => w.Product)
                 .WithMany()
                 .HasForeignKey(w => w.ProductId);
        }
    }
}
