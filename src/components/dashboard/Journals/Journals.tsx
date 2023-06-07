'use client';

import { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getJournals } from '@/services';
import SearchInput from './SearchInput';
import JournalsList from './JournalsList';

const Journals: React.FC = () => {
  const {
    data: journalsData,
    isLoading,
    isError,
    error,
  } = useQuery(['user-journals'], getJournals);
  const [filteredJournals, setFilteredJournals] = useState(journalsData);

  const searchUpdateHandler = useCallback(
    (newQuery: string) => {
      setFilteredJournals((prevJournals) => {
        if (newQuery === '') {
          return journalsData;
        }

        if (Array.isArray(journalsData)) {
          return [...journalsData].filter((journal) => {
            const transformedTitle = journal.journal_title.toLowerCase();
            return transformedTitle.includes(newQuery);
          });
        }

        return prevJournals;
      });
    },
    [journalsData],
  );

  useEffect(() => {
    setFilteredJournals(journalsData);
  }, [journalsData]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p>{error ? `An error has occurred: ${error}` : 'Unexpected error!'}</p>
    );
  }

  return (
    <div className="mt-8 flex-justify-center">
      <SearchInput onUpdate={searchUpdateHandler} />
      {filteredJournals && <JournalsList journals={filteredJournals} />}
    </div>
  );
};

export default Journals;
