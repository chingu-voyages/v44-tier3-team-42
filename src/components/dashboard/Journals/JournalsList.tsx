import Image from 'next/image';
import Link from 'next/link';
import { Edit } from 'react-iconly';

import { Button } from '@/components/ui';
import type { GetJournalsResponse } from '@/services';

type Props = {
  journals: GetJournalsResponse[];
};

const JournalsList: React.FC<Props> = ({ journals }) => (
  <div className="grid max-w-4xl grid-cols-2 gap-4 mx-auto sm:grid-cols-3 justify-items-center place-content-center">
    {journals.map(({ id, cover_image, journal_title }) => (
      <div
        key={id}
        className="relative w-full border-2 rounded-lg border-subtleLight"
      >
        <div className="relative w-full h-52 sm:h-56 md:h-60 lg:h-64">
          {cover_image && (
            <Image src={cover_image} alt="" className="rounded-md" fill />
          )}
        </div>
        <div className="absolute top-2 right-2">
          <button
            type="button"
            className="rounded-full text-primary bg-primarySubtle p-[10px]"
          >
            <Edit size="small" />
          </button>
        </div>
        <Button
          className="absolute bottom-6 right-1/2 translate-x-[50%]"
          size="sm"
          variant="secondary"
        >
          <Link href={`./dashboard/journals/${journal_title}`}>View</Link>
        </Button>
      </div>
    ))}
  </div>
);

export default JournalsList;
