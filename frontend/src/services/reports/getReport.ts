import { IFactory } from '@climadex/shared';

export const getReport = async (id: string): Promise<IFactory> => {
  const response = await fetch(`http://localhost:3000/reports/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch factory report: ${response.statusText}`);
  }

  return response.json();
};
