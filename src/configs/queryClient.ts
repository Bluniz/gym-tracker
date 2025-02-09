import { QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

export { queryClient };
