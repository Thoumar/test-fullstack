import { FactoriesFilters, FactoriesPagination } from '@climadex/shared';

type createSearchParamsForFactoriesParams = {
  filters: FactoriesFilters;
  pagination: FactoriesPagination;
};

export const createSearchParamsForFactories = ({
  filters,
  pagination,
}: createSearchParamsForFactoriesParams): URLSearchParams => {
  const searchParams = new URLSearchParams();

  searchParams.append('page', pagination.page.toString());
  searchParams.append('limit', pagination.limit.toString());

  if (filters.search?.trim()) searchParams.append('q', filters.search.trim());

  if (filters.country?.trim()) searchParams.append('country', filters.country.trim());

  if (filters.minRevenue !== undefined) searchParams.append('minRevenue', filters.minRevenue.toString());

  if (filters.maxRevenue !== undefined) searchParams.append('maxRevenue', filters.maxRevenue.toString());

  return searchParams;
};
