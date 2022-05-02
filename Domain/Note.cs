namespace Domain
{
    public class Note
    {
        public Guid Id { get; set; }
        public string AppUserId { get; set; }
        public DateTime Date { get; set; }
        public string NoteMessage { get; set; }
        public AppUser AppUser { get; set; }
    }
}