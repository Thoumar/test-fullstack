import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getFactories, addFactory } from '../services/factories';

export const useFactories = (filterString = '') => {
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
