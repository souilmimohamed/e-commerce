using API.Helpers;
using Infrastructure.Data.Repositories;
using Infrastructure.Interfaces;
using Infrastructure.Services;
using Microsoft.Extensions.Options;
using System.Text.Json.Serialization;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddControllers()
                 .AddJsonOptions(option =>
                 {
                     option.JsonSerializerOptions.PropertyNamingPolicy = null;
                     option.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                     option.JsonSerializerOptions.WriteIndented = true;
                 });
            services.AddCors();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserService, UserService>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
                });
            });
            return services;
        }
    }
}
