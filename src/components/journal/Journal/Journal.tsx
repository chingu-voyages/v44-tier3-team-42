'use client';

import { useCallback, useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight } from 'react-iconly';

import useBoundStore from '@/store';
import { useLocalStorage, useBreakpoint } from '@/hooks';
import { getJournalByName, appendJournal } from '@/services';
import { MEDIA_QUERY_BREAKPOINTS } from '@/config/constants';
import Notepad from './Notepad';

type Props = {
  slug: string;
};

const Journal: React.FC<Props> = ({ slug }) => {
  const setAlert = useBoundStore((state) => state.setAlert);
  const {
    data: journalData,
    isLoading,
    isError,
    error,
  } = useQuery([slug], () => getJournalByName(slug));
  const appendJournalMutation = useMutation({
    mutationFn: appendJournal,
    onSuccess: (data) => {
      setAlert({
        type: 'success',
        message: data.message,
      });
    },
    onError: (err: Error) => {
      setAlert({
        type: 'error',
        message: err.message,
      });
    },
  });

  const [cursor, setCursor] = useLocalStorage('app:journal-page', 0);
  const isDesktop = useBreakpoint(MEDIA_QUERY_BREAKPOINTS, 'md');

  useEffect(() => {
    setCursor((prevCursor: number) =>
      isDesktop && prevCursor % 2 !== 0 ? prevCursor - 1 : prevCursor,
    );
  }, [isDesktop, setCursor]);

  const paginateHandler = useCallback(
    (dir: -1 | 1) => {
      if (!journalData) {
        return;
      }

      const pageOffset = isDesktop ? 2 : 1;

      if (dir === -1) {
        setCursor((prevCursor: number) =>
          cursor !== 0 ? prevCursor - pageOffset : prevCursor,
        );
      }

      if (dir === 1) {
        setCursor((prevCursor: number) =>
          cursor < journalData.sections.length - pageOffset + 1
            ? prevCursor + pageOffset
            : prevCursor,
        );
      }
    },
    [cursor, isDesktop, journalData, setCursor],
  );

  const savePageHandler = (pageText: string) => {
    if (journalData) {
      appendJournalMutation.mutate({
        journalId: journalData.id,
        journalEntry: pageText,
      });
    }
    setAlert({
      message: `Can't save journal data at the moment. Try again later`,
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p>{error ? `An error has occurred: ${error}` : 'Unexpected error!'}</p>
    );
  }

  const journalSectionsLength = journalData.sections.length;

  return (
    <>
      <div className="p-2 mx-auto bg-gray-200 border-2 border-gray-400 rounded-sm lg:w-10/12">
        <div className="grid grid-flow-col grid-row-1 grid-col-2 gap-x-2 ">
          <div key={cursor}>
            <p>{cursor + 1}</p>
            <Notepad
              id={cursor}
              initialText={
                // Set initial text to existing journal data if present
                // Or otherwise set empty '' if journal page doesn't exist
                cursor < journalSectionsLength
                  ? journalData.sections[cursor].contentDetails.content
                  : ''
              }
              onSave={
                cursor >= journalSectionsLength
                  ? (text) => savePageHandler(text)
                  : undefined
              }
            />
          </div>
          {isDesktop && (
            <div key={cursor + 1}>
              <p>{cursor + 2}</p>
              <Notepad
                id={cursor + 1}
                initialText={
                  // Set initial text to existing journal data if present
                  // Or otherwise set empty '' if journal page doesn't exist
                  cursor < journalSectionsLength - 1
                    ? journalData.sections[cursor + 1].contentDetails.content
                    : ''
                }
                onSave={
                  cursor + 1 >= journalSectionsLength
                    ? (text) => savePageHandler(text)
                    : undefined
                }
              />
            </div>
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
        className="w-full rounded-[5px] h-[5px] bg-bg w-44 mx-auto mt-8 max-w-xs md:max-w-lg"
        role="progressbar"
        aria-label="reading-progress"
      >
        <div
          className="h-full rounded-[5px] bg-primary transition-all"
          style={{
            width: `${((cursor + 1) / (journalSectionsLength + 2)) * 100}%`,
          }}
        />
      </div>
    </>
  );
};

export default Journal;
