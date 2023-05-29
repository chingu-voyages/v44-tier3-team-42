import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@/components/ui';
import {
  createJournalRequestSchema,
  type CreateJournalRequest,
} from '@/services';

type Props = {
  onSubmit: (data: CreateJournalRequest) => void;
};

const NewJournalForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateJournalRequest>({
    resolver: zodResolver(createJournalRequestSchema),
  });

  return (
    <form className="grid gap-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-3">
        <TextField
          id="title"
          label="Title"
          placeholder="Enter a title"
          className="w-full"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('title')}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>
      <div className="flex flex-col gap-y-2">
        <TextField
          id="url"
          label="Cover Image"
          placeholder="Insert an image url"
          className="w-full"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('url')}
        />
        {errors.url && <p className="text-red-500">{errors.url.message}</p>}
      </div>
      <Button
        type="submit"
        className="mt-8 place-self-center w-max"
        size="lg"
        disabled={isSubmitting}
      >
        Create
      </Button>
    </form>
  );
};

export default NewJournalForm;
