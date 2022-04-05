using MediatR;
using Persistence;

namespace Application.Notes
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id {get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var note = await _context.Notes.FindAsync(request.Id);

                _context.Remove(note);

                await _context.SaveChangesAsync();
                
                return Unit.Value;
            }
        }
    }
}