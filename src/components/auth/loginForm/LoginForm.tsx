/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  LoginValidationSchema,
  logInValidationSchema,
} from '../registerForm/schemaValidation';
import { logInUser } from '../../../../plop-templates/service';

const Form: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidationSchema>({
    resolver: zodResolver(logInValidationSchema),
  });

  const onSubmit: SubmitHandler<LoginValidationSchema> = (userData) =>
    logInUser(userData)

  return (
    <form className=" p-6 pt-6 pb-8 mb-4 " onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4  ">
        <div className="">
          <label className="label" htmlFor="userName">
            Username
          </label>
          <input
            className={`w-full px-3 py-2 text-sm leading-tight
             text-gray-700 border ${
               errors.username && 'border-red-500'
             } rounded  appearance-none
              focus:outline-none focus:shadow-outline`}
            id="userName"
            type="text"
            placeholder="user Name"
            {...register('username')}
          />

          {errors.username && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.username?.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4 ">
        <label className="" htmlFor="password">
          Password
        </label>
        <input
          className={`w-full px-3 py-2 text-sm leading-tight text-gray-700 border ${
            errors.password && 'border-red-500'
          } rounded 
          appearance-none focus:outline-none focus:shadow-outline`}
          id="password"
          type="password"
          placeholder="password"
          {...register('password')}
        />
        {errors.password && (
          <p className="text-xs italic text-red-500 mt-2">
            {errors.password?.message}
          </p>
        )}
      </div>

      <div className="mb-6 text-center">
        <button
          className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Log in
        </button>
      </div>
    </form>
  );
};

export default Form;
