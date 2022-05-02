using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (userManager.Users.Any() || context.Notes.Any())
                return;

            var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Lily", UserName = "lily", Email = "lily@test.com", Notes = {}},
                };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");
            }

            var activities = new List<Note>{
                new Note
                {
                    Date = System.DateTime.Now.AddMonths(-2),
                    NoteMessage = "Note1"
                },
                new Note
                {
                    Date = System.DateTime.Now.AddMonths(-2),
                    NoteMessage = "Note2"
                }
                };

            await context.Notes.AddRangeAsync(activities);
            await context.SaveChangesAsync();

        }
    }
}