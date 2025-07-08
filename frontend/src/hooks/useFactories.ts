import { FactoriesFilters, FactoriesPagination } from '@climadex/shared';

import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';

import { getFactories, addFactory, GetFactoriesResult } from 'services';

export interface UseFactoriesOptionsParams {
  filters?: FactoriesFilters;
  pagination?: FactoriesPagination;
}

const DEFAULT_PAGINATION: FactoriesPagination = {
  page: 1,
  limit: 20,
};

export const useFactories = (options: UseFactoriesOptionsParams) => {
  const queryClient = useQueryClient();

  const { filters = {}, pagination = DEFAULT_PAGINATION } = options;

  const { data, isLoading, isError, error, refetch } = useQuery<Awaited<GetFactoriesResult>>({
    queryKey: ['factories', { filters, pagination }],
    queryFn: () => getFactories({ filters, pagination }),
    placeholderData: keepPreviousData,
  });

  const addFactoryMutation = useMutation({
    mutationFn: addFactory,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['factories'] }),
    onError: (error) => console.error('Failed to add factory:', error),
  });

  console.log(data?.factories);

  return {
    factories: data?.factories || [],
    pagination: data?.pagination || {
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
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
