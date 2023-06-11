'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import useBoundStore from '@/store';
import { registerUser } from '@/services';
import NewUserForm from './NewUserForm';

const RegisterUser = () => {
  const router = useRouter();
  const setAlert = useBoundStore((state) => state.setAlert);
  const registerUserMutation = useMutation({
    mutationFn: registerUser,
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
    <div className="w-4/5 max-w-sm mx-auto">
      <h1 className="leading-10 text-[32px] text-center mb-6">Signup</h1>
      <NewUserForm onSubmit={(data) => registerUserMutation.mutate(data)} />
    </div>
  );
};

export default RegisterUser;
