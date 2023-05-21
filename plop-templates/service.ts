// NOTE: Replace instance of 'getDummyData' with a method of the service.
// Also, remember to export * from this file into the `index.ts`

import { SERVER_URL } from '@/config/constants';

export const getDummyData = async (): Promise<any> => {
  const res = await fetch(`${SERVER_URL}/`, {
    method: 'GET',
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};
