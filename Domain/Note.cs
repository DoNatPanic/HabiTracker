namespace Domain
{
    public class Note
    {
        public Guid UserId { get; set; }
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string NoteMessage { get; set; }
    }
}