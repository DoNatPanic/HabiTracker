using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Note>()
            .HasOne(a => a.AppUser)
            .WithMany(b => b.Notes)
            .HasForeignKey(note => note.AppUserId);;

            /*builder.Entity<Note>(b =>
            {
                b.HasOne<AppUser>()
                 .WithMany()
                 .HasForeignKey(note => note.AppUserId);
            });*/

        }

    }
}