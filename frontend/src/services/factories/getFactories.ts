import { Factory, FactoriesFilters, FactoriesPagination } from '@climadex/shared';

import { createSearchParamsForFactories } from 'utils';

export type GetFactoriesParams = {
  filters?: FactoriesFilters;
  pagination?: FactoriesPagination;
};

export type GetFactoriesResult = Promise<{
  factories: Factory[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}>;

export const getFactories = async ({
  filters = {},
  pagination = { page: 1, limit: 20 },
}: GetFactoriesParams = {}): GetFactoriesResult => {
  const url = `${import.meta.env.VITE_PUBLIC_API_URL}/factories`;

  const searchParams = createSearchParamsForFactories({ filters, pagination });

  const response = await fetch(`${url}?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch factories: ${response.statusText}`);
  }

  return response.json();
};
