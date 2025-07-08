import { PaginationOptions } from '@climadex/shared';

type SanitizePaginationResult = {
  sanitizedPage: number;
  sanitizedLimit: number;
  offset: number;
};

type SanitizePaginationParams = PaginationOptions;

export const sanitizePagination = ({ page = 1, limit = 20 }: SanitizePaginationParams): SanitizePaginationResult => {
  const sanitizedLimit = Math.min(Math.max(1, limit), 100);
  const sanitizedPage = Math.max(1, page);
  const offset = (sanitizedPage - 1) * sanitizedLimit;
  return { sanitizedPage, sanitizedLimit, offset };
};
