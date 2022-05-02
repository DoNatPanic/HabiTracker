using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Notes
{
    public class List
    {
        public class Query : IRequest<List<Note>> { }

        public class Handler : IRequestHandler<Query, List<Note>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<List<Note>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Notes.Where(a => a.AppUserId == _userAccessor.GetUserId()).ToListAsync();

            }
        }
    }
}