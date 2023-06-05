'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Button, Dialog } from '@/components/ui';
import { createJournal } from '@/services';
import useBoundStore from '@/store';
import NewJournalForm from './NewJournalForm';

const CreateJournal = () => {
  const setAlert = useBoundStore((state) => state.setAlert);
  const [isOpen, setIsOpen] = useState(false);
  const newJournalMutation = useMutation({
    mutationFn: createJournal,
    onSuccess: (data) => {
      setIsOpen(false);
      setAlert({ type: 'success', message: data.message });
    },
    onError: (err: Error) => {
      setAlert({
        type: 'default',
        message: err.message,
      });
    },
  });

  return (
    <>
      <Button variant="tertiary" onClick={() => setIsOpen(true)}>
        Create Journal
      </Button>
      <Dialog
        title="Create Journal"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <NewJournalForm onSubmit={(data) => newJournalMutation.mutate(data)} />
      </Dialog>
    </>
  );
};

export default CreateJournal;
