using AutoMapper;
using AutoMapper.QueryableExtensions;
using Infrastructure.Data.Entities;
using Infrastructure.DTOs;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Repositories
{
    public class UsersRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UsersRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<User> AddUser(User user)
        {
            await _context.Users.AddAsync(user);
            return user;
        }

        public Task<User> DeleteUser(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<User> GetUserByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<User> GetUserById(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<IEnumerable<UserDto>> GetUsers()
        {
            var users = _context.Users.AsQueryable();
            return users.AsNoTracking().ProjectTo<UserDto>(_mapper.ConfigurationProvider);
        }

        public async Task<UserDto> UpdateUser(User user)
        {
            _context.Users.Update(user);
            return _mapper.Map<UserDto>(user);
        }
    }
}
