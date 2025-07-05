import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { IFactory } from '@climadex/shared';

interface AddFactoryData {
  name: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
  yearlyRevenue: number;
}

interface UseFactoriesResult {
  data: IFactory[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
  addFactory: {
    mutate: (data: AddFactoryData) => void;
    mutateAsync: (data: AddFactoryData) => Promise<{ result: string }>;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    isSuccess: boolean;
  };
}

const getFactories = async (filterString = ''): Promise<IFactory[]> => {
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

const addFactory = async (
  data: AddFactoryData
): Promise<{ result: string }> => {
  const response = await fetch('http://localhost:3000/factories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to add factory: ${response.statusText}`);
  }

  return response.json();
};

export const useFactories = (filterString = ''): UseFactoriesResult => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['factories', filterString],
    queryFn: () => getFactories(filterString),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  const addFactoryMutation = useMutation({
    mutationFn: addFactory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['factories'] });
    },
    onError: (error) => {
      console.error('Failed to add factory:', error);
    },
  });

  return {
    data,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
    addFactory: {
      mutate: addFactoryMutation.mutate,
      mutateAsync: addFactoryMutation.mutateAsync,
      isLoading: addFactoryMutation.isPending,
      isError: addFactoryMutation.isError,
      error: addFactoryMutation.error as Error | null,
      isSuccess: addFactoryMutation.isSuccess,
    },
  };
};
