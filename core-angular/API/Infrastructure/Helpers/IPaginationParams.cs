

namespace Infrastructure.Helpers
{
    public class IPaginationParams
    {
        private const int MaxPageSize = 50;
        public int PageNumer { get; set; }
        private int _pageSize { get; set; }
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
    }
}