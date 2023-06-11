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

  if (Array.isArray(data) && data.length > 0) {
    // Check to see if JSON object in the data array is valid
    getJournalsResponseSchema.parse(data[0]);
  }

  return data;
};

export const createJournalRequestSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: 'Include at least a single letter :¬)' })
    .max(50, { message: 'Something a bit shorter please :D' }),
  url: z
    .string()
    .url({ message: 'Must provide a valid image url' })
    .max(60, { message: 'Something a bit shorter please :D' }),
});

export type CreateJournalRequest = z.infer<typeof createJournalRequestSchema>;

export const createJournal = async (
  newJournal: CreateJournalRequest,
): Promise<SuccessResponse> => {
  const res = await fetch(`${SERVER_URL}/create-journal`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(newJournal),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error((data as ErrorResponse).message);
  }

  return data;
};

const getJournalByNameResponseSchema = journalReferenceSchema.extend({
  sections: z.array(
    z.object({
      contentDetails: journalContentSchema,
    }),
  ),
});

export type GetJournalByNameResponse = z.infer<
  typeof getJournalByNameResponseSchema
>;

export const getJournalByName = async (
  title: string,
): Promise<GetJournalByNameResponse> => {
  const res = await fetch(`${SERVER_URL}/journal-with-name?title=${title}`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error((data as ErrorResponse).message);
  }

  // Check to see if JSON object in the data array is valid
  getJournalByNameResponseSchema.parse(data);

  return data;
};

type AppendJournalEntryVariables = {
  referenceId: number;
  content: string;
  sectionNumber: number;
};

export const appendJournalEntry = async (
  variables: AppendJournalEntryVariables,
): Promise<SuccessResponse> => {
  const res = await fetch(`${SERVER_URL}/save-section`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(variables),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error((data as ErrorResponse).message);
  }

  return data;
};

type EditJournalEntryVariables = {
  id: number;
  content: string;
};

export const editJournalEntry = async (
  variables: EditJournalEntryVariables,
): Promise<SuccessResponse> => {
  const res = await fetch(`${SERVER_URL}/edit-section`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(variables),
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error((data as ErrorResponse).message);
  }

  return data;
};
