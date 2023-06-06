import { dehydrate, Hydrate } from '@tanstack/react-query';

import getQueryClient from '@/app/getQueryClient';
import CreateJournal from '@/components/dashboard/CreateJournal';
import Journals from '@/components/dashboard/Journals';
import { getJournals } from '@/services';

const Dashboard = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['user-journals'], getJournals);
  // @ts-expect-error Server Component
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <main className="min-h-screen p-12">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <h1>Dashboard</h1>
          <CreateJournal />
        </div>
        <Journals />
      </main>
    </Hydrate>
  );
};

export default Dashboard;
