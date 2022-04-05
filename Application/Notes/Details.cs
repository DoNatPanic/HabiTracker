using Domain;
using MediatR;
using Persistence;

namespace Application.Notes
{
    public class Details
    {
        public class Query: IRequest<Note>{
            public Guid Id {get; set;}
        }

        public class Handler : IRequestHandler<Query, Note>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Note> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Notes.FindAsync(request.Id);
            }
        }
    }
}