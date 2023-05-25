'use client';

import { useQuery } from '@tanstack/react-query';

import { getJournals } from '@/services';
import JournalsList from './JournalsList';

const Journals = () => {
  const {
    data: journalsData,
    isLoading,
    isError,
    error,
  } = useQuery(['user-journals'], getJournals);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return (
      <p>{error ? `An error has occurred: ${error}` : 'Unexpected error!'}</p>
    );
  }

  return <JournalsList journals={journalsData} />;
};

export default Journals;
