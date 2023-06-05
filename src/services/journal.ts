import z from 'zod';

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
  cover_image: z.string().or(z.null()),
});

export type JournalReference = z.infer<typeof journalReferenceSchema>;

const journalSectionSchema = z.object({
  id: z.number(),
  journal_reference_id: z.number(),
  section_number: z.number(),
});

export type JournalSection = z.infer<typeof journalSectionSchema>;

const journalContentSchema = z.object({
  id: z.number(),
  journal_section_id: z.number(),
  content: z.string(),
});

export type JournalContent = z.infer<typeof journalContentSchema>;

/// ///////////////////////////////////
/// //////// METHODS
/// ///////////////////////////////////

const getJournalsResponseSchema = journalReferenceSchema.omit({
  user_id: true,
});

export type GetJournalsResponse = z.infer<typeof getJournalsResponseSchema>;

export const getJournals = async (): Promise<GetJournalsResponse[]> => {
  const res = await fetch(`${SERVER_URL}/browse-journals`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error((data as ErrorResponse).message);
  }

  if (data.length > 0) {
    // Check to see if JSON object in the data array is valid
    journalReferenceSchema.parse(data[0]);
  }

  return data;
};

export const createJournalRequestSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Include at least a single letter :¬)' })
    .max(50, { message: 'Something a bit shorter please :D' }),
  url: z.string().url({ message: 'Must provide a valid image url' }),
});

export type CreateJournalRequest = z.infer<typeof createJournalRequestSchema>;

export const createJournal = async (
  newJournal: CreateJournalRequest,
): Promise<SuccessResponse> => {
  const res = await fetch(`${SERVER_URL}/create-journal`, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(newJournal),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error((data as ErrorResponse).message);
  }

  return data;
};

const getJournalByNameResponseSchema = journalReferenceSchema.pick({
  id: true,
});

type GetJournalByNameResponse = z.infer<typeof getJournalByNameResponseSchema>;

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
