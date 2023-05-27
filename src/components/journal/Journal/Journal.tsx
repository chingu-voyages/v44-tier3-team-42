'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight } from 'react-iconly';

import { useLocalStorage, useBreakpoint } from '@/hooks';
import { getJournalByName } from '@/services';
import { MEDIA_QUERY_BREAKPOINTS } from '@/config/constants';
import Notepad from './Notepad';

type Props = {
  slug: string;
};

const Journal: React.FC<Props> = ({ slug }) => {
  const {
    data: journalData,
    isLoading,
    isError,
    error,
  } = useQuery([slug], () => getJournalByName(slug));
  const [cursor, setCursor] = useLocalStorage('app:journal-page', 0);
  const isDesktop = useBreakpoint(MEDIA_QUERY_BREAKPOINTS, 'md');

  // NOTE: Waiting for backend to include sections along the journal data
  // @ts-expect-error
  const journalSectionsLength = journalData.sections.length;

  const paginateHandler = useCallback(
    (dir: -1 | 1) => {
      if (dir === -1) {
        if (cursor !== 0) {
          setCursor((prevPage: number) => prevPage - 1);
        }
      }

      if (dir === 1) {
        if (cursor !== journalSectionsLength - 1) {
          setCursor((prevPage: number) => prevPage + 1);
        }
      }
    },
    [cursor, journalSectionsLength, setCursor],
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p>{error ? `An error has occurred: ${error}` : 'Unexpected error!'}</p>
    );
  }

  return (
    <>
      <div className="p-2 mx-auto bg-gray-200 border-2 border-gray-400 rounded-sm lg:w-10/12">
        <div className="grid grid-flow-col grid-row-1 grid-col-2 gap-x-2 ">
          <Notepad
            key={cursor}
            id={cursor}
            initialText={
              // Set initial text to existing journal data if present
              // Or otherwise set empty '' if journal page doesn't exist
              cursor < journalSectionsLength - 1
                ? // @ts-expect-error See line 27
                  journalData.sections[cursor].content
                : ''
            }
          />
          {isDesktop && (
            <Notepad
              key={cursor + 1}
              id={cursor + 1}
              initialText={
                // Set initial text to existing journal data if present
                // Or otherwise set empty '' if journal page doesn't exist
                cursor < journalSectionsLength - 1
                  ? // @ts-expect-error See line 27
                    journalData.sections[cursor + 1].content
                  : ''
              }
            />
          )}
        </div>
        <div className="grid grid-flow-col grid-rows-1 mt-5 mb-4 grid-col-2 gap-x-32">
          <button
            type="button"
            className="place-self-end w-min rounded-full text-primary bg-primarySubtle p-[10px]"
            onClick={() => paginateHandler(-1)}
          >
            <ArrowLeft />
          </button>
          <button
            type="button"
            className="place-self-start w-min rounded-full text-primary bg-primarySubtle p-[10px]"
            onClick={() => paginateHandler(1)}
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <div
        className="w-full rounded-[5px] h-[5px] bg-bg w-44 mx-auto mt-8"
        role="progressbar"
        aria-label="reading-progress"
      >
        <div
          className="h-full rounded-[5px] bg-primary transition-all"
          style={{
            width: `${
              (1 -
                (journalSectionsLength - cursor - 1) / journalSectionsLength) *
              100
            }%`,
          }}
        />
      </div>
    </>
  );
};

export default Journal;
