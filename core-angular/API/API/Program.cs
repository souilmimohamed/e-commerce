using API.Extensions;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
var connString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationServices();
builder.Services.AddIdentityServices(builder.Configuration);
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseNpgsql(connString);
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Content")),
    RequestPath = "/Content"
});
app.UseCors("CorsPolicy");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
//seeding
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
var context = services.GetRequiredService<DataContext>();
try
{
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}
catch (Exception e)
{
    throw e;
}
app.Run();
