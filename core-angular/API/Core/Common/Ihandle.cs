

namespace Core.Common
{
    public interface Ihandle<TData, TResponse>
    {
        Task<TResponse> HandleAsync();
        Task<TResponse> ValidateAsync();
    }
}
