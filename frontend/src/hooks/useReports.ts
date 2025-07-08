import { useQuery } from '@tanstack/react-query';

import { getReport, type GetReportResult } from 'services';

interface UseReportParams {
  id: string;
}

export const useReport = ({ id }: UseReportParams) => {
  const {
    data: report,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Awaited<GetReportResult>>({
    queryKey: ['report', id],
    queryFn: () => getReport({ id }),
    enabled: !!id,
  });

  return {
    report,
    isLoading,
    isError,
    error: error as Error | null,
    refetch,
  };
};
