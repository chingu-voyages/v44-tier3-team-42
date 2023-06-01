'use client';

import useBoundStore from '@/store';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/services';
import { useRouter } from 'next/navigation';

import { Button, Dialog } from '@/components/ui';

import { useState } from 'react';

import LoginForm from './LoginForm';

const LoginUser = () => {
  const router = useRouter();
  const setAlert = useBoundStore((state) => state.setAlert);
  const [isOpen, setIsOpen] = useState(false);
  const loginUserMutation = useMutation({
    mutationFn: loginUser,
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
      <Button className='bg-primary text-white' variant="tertiary" onClick={() => setIsOpen(true)}>
        Login
      </Button>
      <Dialog title="Login" open={isOpen} onClose={() => setIsOpen(false)}>
        <LoginForm onSubmit={(data) => loginUserMutation.mutate(data)} />
      </Dialog>
    </>
  );
};

export default LoginUser;
