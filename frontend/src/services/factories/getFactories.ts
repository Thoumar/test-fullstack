import { IFactory } from '@climadex/shared';

const getFactories = async (filterString = ''): Promise<IFactory[]> => {
  const url =
    filterString === ''
      ? 'http://localhost:3000/factories'
      : `http://localhost:3000/factories?q=${filterString}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch factories: ${response.statusText}`);
  }

  return response.json();
};

export { getFactories };
