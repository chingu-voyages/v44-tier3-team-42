import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Hide, Show } from 'react-iconly';

import { Button, TextField } from '@/components/ui';
import {
  registerUserRequestSchema,
  type RegisterUserRequest,
} from '@/services';

type Props = {
  onSubmit: (data: RegisterUserRequest) => void;
};

const NewUserForm: React.FC<Props> = ({ onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterUserRequest>({
    resolver: zodResolver(registerUserRequestSchema),
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
          id="username"
          className="w-full"
          label="Username"
          placeholder="Enter a username"
          autoComplete="username"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('username')}
        />
        {errors.username && (
          <p className="text-xs text-red-500">{errors.username.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-y-3">
        <TextField
          id="email"
          className="w-full"
          label="Email"
          placeholder="Enter an email"
          autoComplete="email"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('email')}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email?.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-y-3">
        <TextField
          id="password"
          className="w-full"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          placeholder="Enter a strong password"
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
        Create Account
      </Button>
    </form>
  );
};

export default NewUserForm;
