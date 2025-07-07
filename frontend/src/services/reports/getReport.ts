import { Factory } from '@climadex/shared';

type GetReportParams = {
  id: string;
};

type GetReportResult = Promise<Factory>;

export const getReport = async ({ id }: GetReportParams): GetReportResult => {
  const url = `${import.meta.env.VITE_PUBLIC_API_URL}/reports/${id}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch factory report: ${response.statusText}`);
  }

  return response.json();
};
