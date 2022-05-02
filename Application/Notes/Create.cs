using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Notes
{
    public class Create
    {
        public class Command : IRequest
        {
            public Note Note { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                request.Note.AppUserId = _userAccessor.GetUserId();

                _context.Notes.Add(request.Note);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}