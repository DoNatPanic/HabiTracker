using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Notes
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Note Note { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var note = await _context.Notes.FindAsync(request.Note.Id);

                request.Note.AppUserId = _userAccessor.GetUserId();

                _mapper.Map(request.Note, note);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}