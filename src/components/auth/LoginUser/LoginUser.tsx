import useBoundStore from '@/store';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import LoginForm from './LoginForm';

const LoginUser = () => {
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
      <LoginForm onSubmit={(data) => registerUserMutation.mutate(data)} />
    </div>
  );
};

export default LoginUser;
