using Infrastructure.Data.Entities;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;

namespace Infrastructure.Data
{
    public class Seed
    {
        public Seed()
        {

        }
        public static async Task SeedData(DataContext context)
        {
            var _path = GetThisFilePath();
            var path = Path.GetDirectoryName(_path);
            if (!context.Brands.Any())
            {
                var brandsData = File.ReadAllText(path + @"/Brands.json");
                var brands = JsonSerializer.Deserialize<List<Brand>>(brandsData);
                context.Brands.AddRange(brands);
            }

            if (!context.Categories.Any())
            {
                var categoriesData = File.ReadAllText(path + @"/Categories.json");
                var categories = JsonSerializer.Deserialize<List<Category>>(categoriesData);
                context.Categories.AddRange(categories);
            }

            if (!context.Products.Any())
            {
                var productsData = File.ReadAllText(path + @"/Products.json");
                var products = JsonSerializer.Deserialize<List<Product>>(productsData);
                products.ForEach(p =>
                {
                    p.TimeStamp = DateTime.UtcNow;
                });
                context.Products.AddRange(products);
            }
            if (context.ChangeTracker.HasChanges()) await context.SaveChangesAsync();
        }
        private static string GetThisFilePath([CallerFilePath] string path = null)
        {
            return path;
        }
    }
}
