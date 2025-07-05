import { useQuery } from '@tanstack/react-query';

import { getReport } from 'services';

export const useReport = (id: string) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['report', id],
    queryFn: () => getReport(id),
    enabled: !!id,
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
