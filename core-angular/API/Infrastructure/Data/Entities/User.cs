
namespace Infrastructure.Data.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime TiemStamp { get; set; }
        public ICollection<Wishlist> WishlistItems { get; } = new List<Wishlist>();
    }
}
