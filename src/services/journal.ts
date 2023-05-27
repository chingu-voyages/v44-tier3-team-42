import { z } from 'zod';

import { SERVER_URL } from '@/config/constants';

type ErrorResponse = {
  message: string;
};

type SuccessResponse = {
  message: string;
};

/// ///////////////////////////////////
/// //////// SCHEMAS
/// ///////////////////////////////////

const journalReferenceSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  journal_title: z.string(),
  cover_image: z.string(),
});

export type JournalReference = Partial<z.infer<typeof journalReferenceSchema>>;

const journalSectionSchema = z.object({
  id: z.number(),
  journal_reference_id: z.number(),
  section_number: z.number(),
});

export type JournalSection = Partial<z.infer<typeof journalSectionSchema>>;

const journalContentSchema = z.object({
  id: z.number(),
  journal_section_id: z.number(),
  content: z.string(),
});

export type JournalContent = Partial<z.infer<typeof journalContentSchema>>;

/// ///////////////////////////////////
/// //////// METHODS
/// ///////////////////////////////////

const GetJournalsResponseSchema = journalReferenceSchema.omit({
  id: true,
  user_id: true,
});

type GetJournalsResponse = z.infer<typeof GetJournalsResponseSchema>;

export const getJournals = async (): Promise<GetJournalsResponse[]> => {
  const res = await fetch(`${SERVER_URL}/browse-journals`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error((data as ErrorResponse).message);
  }

  // Check to see if JSON object in the data array is valid
  journalReferenceSchema.parse(data[0]);

  return data;
};

const GetJournalByNameResponseSchema = journalReferenceSchema.pick({
  id: true,
});

type GetJournalByNameResponse = z.infer<typeof GetJournalByNameResponseSchema>;

export const getJournalByName = async (
  title: string,
): Promise<GetJournalByNameResponse> => {
  const req = { title };
  const res = await fetch(`${SERVER_URL}/journal-with-name`, {
    method: 'GET',
    credentials: 'include',
    body: JSON.stringify(req),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error((data as ErrorResponse).message);
  }

  // Check to see if JSON object in the data array is valid
  journalReferenceSchema.parse(data);

  return data;
};

export const updateJournal = async (
  id: number,
  journalEntry: string,
): Promise<SuccessResponse> => {
  const req = { journalId: id, journalEntry };
  const res = await fetch(`${SERVER_URL}/save-journal`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(req),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error((data as ErrorResponse).message);
  }

  return data;
};
