import { dehydrate, Hydrate } from '@tanstack/react-query';

import getQueryClient from '@/app/getQueryClient';
import Journal from '@/components/journal/Journal';
import { getJournalByName } from '@/services';

type PageProps = {
  params: {
    slug: string;
  };
};

const JournalEntry = async ({ params }: PageProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([params.slug], () =>
    getJournalByName(params.slug),
  );
  // @ts-expect-error Server Component
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <main className="min-h-screen p-12">
        <div>Journal</div>
        <Journal slug={params.slug} />
      </main>
    </Hydrate>
  );
};

export default JournalEntry;
