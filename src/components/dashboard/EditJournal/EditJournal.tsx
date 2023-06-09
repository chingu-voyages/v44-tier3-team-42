'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { Button, Dialog } from '@/components/ui';
import { createJournal, editJournal } from '@/services';
import useBoundStore from '@/store';
import UpdatedJournalForm from './UpdatedJournalForm';
import { Edit } from 'react-iconly';


const EditJournal = () => {
  const setAlert = useBoundStore((state) => state.setAlert);
  const [isOpen, setIsOpen] = useState(false);
  const editJournalMutation = useMutation({
    mutationFn: editJournal,
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
      <Edit size="small" />
      </Button>
      <Dialog
        title="Edit Journal"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <UpdatedJournalForm onSubmit={(data) => editJournalMutation.mutate(data)} />
      </Dialog>
    </>
  );
};

export default EditJournal;
