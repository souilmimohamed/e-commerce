using System.ComponentModel.DataAnnotations;

namespace Infrastructure.DTOs
{
    public class RegisterUserDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [MinLength(6, ErrorMessage = "username sould by at least 6 caracters long")]
        [MaxLength(12, ErrorMessage = "username sould by at most 12 caracters long")]
        public string Username { get; set; }
        [Required]
        [RegularExpression("^(?=.*[A-Z])(?=.*\\d)(?=.*\\W).{6,}$"
        , ErrorMessage = "Password should be at least 6 caraters long, contains at least one Uppercase, one digit and one symbol")]
        public string Password { get; set; }
    }
}
