using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context){
            if(context.Notes.Any()) return;

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