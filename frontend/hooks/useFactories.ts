import { useQuery } from '@tanstack/react-query';
import { IFactory } from '@climadex/shared';

interface UseFactoriesResult {
  data: IFactory[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
}

const fetchFactories = async (filterString = ''): Promise<IFactory[]> => {
  const url =
    filterString === ''
      ? 'http://localhost:3000/factories'
      : `http://localhost:3000/factories?q=${filterString}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch factories: ${response.statusText}`);
  }

  return response.json();
};

export const useFactories = (filterString = ''): UseFactoriesResult => {
  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['factories', filterString],
    queryFn: () => fetchFactories(filterString),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    data,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
};
