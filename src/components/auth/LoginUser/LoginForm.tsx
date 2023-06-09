import { Button, TextField } from '@/components/ui';
import { LoginUserRequest, loginUserRequestSchema } from '@/services';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Hide, Show } from 'react-iconly';

type Props = {
  onSubmit: (data: LoginUserRequest) => void;
};

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginUserRequest>({
    resolver: zodResolver(loginUserRequestSchema),
  });

  let trailIcon: React.ReactNode = null;

  if (showPassword) {
    trailIcon = (
      <button type="button" onClick={() => setShowPassword(false)}>
        <Hide />
      </button>
    );
  } else {
    trailIcon = (
      <button type="button" onClick={() => setShowPassword(true)}>
        <Show />
      </button>
    );
  }

  return (
    <form className="grid gap-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-3">
        <TextField
          id="email"
          className="w-full"
          label="Email"
          placeholder="Enter your email"
          autoComplete="email"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('username')}
        />
        {errors.username && (
          <p className="text-xs text-red-500">{errors.username?.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-y-3">
        <TextField
          id="password"
          className="w-full"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          placeholder="Enter your password"
          autoComplete="new-password"
          trailIcon={trailIcon}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('password')}
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="mt-8 place-self-center w-max hover:bg-blue-700 focus:shadow-outline"
        disabled={isSubmitting}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
