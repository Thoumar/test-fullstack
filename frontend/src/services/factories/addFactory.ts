export type AddFactoryParams = {
  name: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
  yearlyRevenue: number;
};

export type AddFactoryResult = Promise<{
  result: string;
}>;

export const addFactory = async ({
  name,
  country,
  address,
  latitude,
  longitude,
  yearlyRevenue,
}: AddFactoryParams): AddFactoryResult => {
  const url = `${import.meta.env.VITE_PUBLIC_API_URL}/factories`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      country,
      address,
      latitude,
      longitude,
      yearlyRevenue,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to add factory: ${response.statusText}`);
  }

  return response.json();
};
