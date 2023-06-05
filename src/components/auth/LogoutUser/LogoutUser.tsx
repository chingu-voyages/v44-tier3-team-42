'use client';

import { Button, Dialog } from '@/components/ui';
import { logOutUser } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Logout } from 'react-iconly';

const LogoutUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const logoutUserMutation = useMutation({
    mutationFn: logOutUser,
    onSuccess: () => {
      router.replace('/dashboard');
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
          onClick={(data) => logoutUserMutation.mutate(data)}
          type="submit"
          className="mt-8 place-self-center w-max hover:bg-blue-700 focus:shadow-outline"
        >
          Ok
        </Button>
      </Dialog>
    </>
  );
};

export default LogoutUser;
