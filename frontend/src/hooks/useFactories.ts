import { FactoriesFilters, FactoriesPagination } from '@climadex/shared';

import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';

import { getFactories, addFactory, PaginatedFactoriesResult } from 'services';

export interface UseFactoriesOptions {
  filters?: FactoriesFilters;
  pagination?: FactoriesPagination;
}

const DEFAULT_PAGINATION: FactoriesPagination = {
  page: 1,
  limit: 20,
};

export const useFactories = (options: UseFactoriesOptions = {}) => {
  const queryClient = useQueryClient();

  const { filters = {}, pagination = DEFAULT_PAGINATION } = options;

  const queryKey = ['factories', { filters, pagination }];

  const { data, isLoading, isError, error, refetch } =
    useQuery<PaginatedFactoriesResult>({
      queryKey,
      queryFn: () => getFactories({ filters, pagination }),
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      placeholderData: keepPreviousData,
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
    factories: data?.data || [],
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
