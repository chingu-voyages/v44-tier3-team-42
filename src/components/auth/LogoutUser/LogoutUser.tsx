'use client';

import { Button, Dialog } from '@/components/ui';
import { logOutUser } from '@/services';
import useBoundStore from '@/store';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LogoutUser = () => {
  const router = useRouter()
  const setAlert = useBoundStore((state) => state.setAlert)
  const [isOpen, setIsOpen] = useState(false);
  const logoutUserMutation = useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      router.replace('/');
    },
    onError: (err: Error) => {
      setAlert({
        type: 'error',
        message: err.message,
      });
    },
  });
  return (
    <>
      <Button
        className="text-black"
        variant="tertiary"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        Logout
      </Button>
      <Dialog
        title="Sure you want to logout?"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <p className="">
          After you logout, your journals will be locked forever and can be only
          unlocked again with the correct key - be sure to not lose it at all
          costs!
        </p>
        <Button
          onClick={() => logoutUserMutation.mutate()}
          type="button"
          className="mt-8 place-self-center w-max hover:bg-blue-700 focus:shadow-outline"
        >
          Ok
        </Button>
      </Dialog>
    </>
  );
};

export default LogoutUser;
