type AddFactoryData = {
  name: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
  yearlyRevenue: number;
};

const addFactory = async (
  data: AddFactoryData
): Promise<{ result: string }> => {
  const response = await fetch('http://localhost:3000/factories', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to add factory: ${response.statusText}`);
  }

  return response.json();
};

export type { AddFactoryData };
export { addFactory };
