import { Url } from 'url';

import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { GoogleLoginResponse, useGoogleLogin } from 'react-google-login';
import { useForm } from 'react-hook-form';
import { UseMutationResult } from 'react-query';

import LazyDynamicHeight from '../Effect/LazyDynamicHeight';
import Hr from '../HTMLTags/Hr';
import Input from '../HTMLTags/Input';
import Notice from '../HTMLTags/Notice';

import UserCredentials from './UserCredentials';

interface Props {
  /**
   * The function that should be users to create a new user
   * upon click of the registration or google login button;
   */
  mutation: UseMutationResult<any, unknown, UserCredentials, unknown>;

  /**
   * Redirection Uri after user registration
   */
  redirectURL?: Url | string;
}

const RegistrationForm: React.FC<Props> = ({ mutation, redirectURL }) => {
  const router = useRouter();

  /** Create user */
  const requestUserCreation = (userCredentials: UserCredentials) => {
    return mutation.mutate(userCredentials);
  };

  // Redirect depending on status
  useEffect(() => {
    if (redirectURL && mutation.isSuccess) {
      router.push(redirectURL);
    }
  }, [mutation.isSuccess, redirectURL, router]);

  // Forms controls;
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<{
    password: string;
    email: string;
    password_confirmation: string;
  }>();

  // Google Oauth 2
  const { signIn, loaded } = useGoogleLogin({
    onSuccess: (response) => {
      if (response.code) return;

      mutation.mutate({
        type: 'google',
        googleAccessToken: (response as GoogleLoginResponse).accessToken
      });
    },
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  });

  return (
    <div
      className="flex flex-col p-8 m-auto bg-white border-2 border-gray-300 rounded-md w-[26rem]"
      onSubmit={handleSubmit((form) =>
        requestUserCreation({ type: 'basic', ...form })
      )}
    >
      <form className="flex flex-col">
        <h1 className="text-3xl font-extrabold text-primary-800 mb-4">
          Register
        </h1>

        <LazyDynamicHeight>
          {mutation.isError && (
            <Notice color={'red'}>
              Account using these email has already been registered
            </Notice>
          )}
        </LazyDynamicHeight>

        <Input
          label="Email"
          type="email"
          {...register('email', {
            required: true
          })}
        ></Input>

        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          {...register('password', {
            required: true
          })}
        ></Input>

        <Input
          label="confirm password"
          type="password"
          autoComplete="new-password"
          {...register('password_confirmation', {
            required: true
          })}
        ></Input>

        <LazyDynamicHeight>
          {errors.password && (
            <Notice color={'yellow'} className={' mb-2'}>
              {' '}
              {errors.password}
            </Notice>
          )}
        </LazyDynamicHeight>

        <button
          type="submit"
          className="mt-2 px-7 bg-primary-700 text-white py-2 mb-4 active:bg-primary-600"
          style={{
            opacity: mutation.isLoading ? 0.9 : 1
          }}
        >
          Register
        </button>
      </form>
      <Hr padding="0.5em" className="text-gray-500">
        or register with
      </Hr>
      <button
        onClick={signIn}
        disabled={!loaded}
        className="mt-2 px-7 border-red-500  text-red-800 py-2 border-2 rounded disabled:border-slate-300"
      >
        Google
      </button>
      <a className="mt-8 text-primary-900 underline">Forgot Password?</a>
    </div>
  );
};

export default RegistrationForm;
