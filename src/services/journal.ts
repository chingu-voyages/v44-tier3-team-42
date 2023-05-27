import { z } from 'zod';

import { SERVER_URL } from '@/config/constants';

type ErrorObject = {
  message: string;
};

const journalReferenceSchema = z.object({
  journal_title: z.string(),
  cover_image: z.string(),
});

export type JournalReference = z.infer<typeof journalReferenceSchema>;

export const getJournals = async (): Promise<JournalReference[]> => {
  const res = await fetch(`${SERVER_URL}/browse-journals`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error((data as ErrorObject).message);
  }

  // Check to see if JSON object in the data array is valid
  journalReferenceSchema.parse(data[0]);

  return data;
};
