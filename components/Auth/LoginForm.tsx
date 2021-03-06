import { Url } from 'url';

import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { GoogleLoginResponse, useGoogleLogin } from 'react-google-login';
import { useForm } from 'react-hook-form';
import { UseMutationResult } from 'react-query';

import useControlledRequest from '../../utils/hook/useControlledRequest';
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

const LoginForm: React.FC<Props> = ({ mutation, redirectURL }) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<{
    email: 'string';
    password: 'string';
  }>();

  const controller = useControlledRequest(2000);

  const requestUserLogin = (userCredentials: UserCredentials) => {
    mutation.mutate(userCredentials);
  };

  const { signIn } = useGoogleLogin({
    onSuccess: (response) => {
      if (response.code) return;

      mutation.mutate({
        type: 'google',
        googleAccessToken: (response as GoogleLoginResponse).accessToken
      });
    },
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  });

  useEffect(() => {
    if (redirectURL && controller.status == 200) {
      router.push(redirectURL);
    }
  }, [controller.status, redirectURL, router]);

  return (
    <div
      className="flex flex-col  max-w-full p-8 bg-white border-2 border-gray-300 rounded-md h-fit m-auto w-[26rem]"
      onSubmit={handleSubmit((form) =>
        requestUserLogin({ type: 'basic', ...form })
      )}
    >
      <form className="flex flex-col">
        <h1 className="text-3xl font-extrabold text-primary-800 mb-4">Login</h1>

        <LazyDynamicHeight>
          {controller.status === 401 ?? (
            <Notice color={'red'}>Wrong username or password</Notice>
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
          autoComplete="password"
          {...register('password', {
            required: true
          })}
        ></Input>

        <button
          type="submit"
          className="mt-2 px-7 bg-primary-700 active:bg-primary-500 text-white py-2 mb-4"
        >
          Login
        </button>
      </form>
      <Hr padding="0.5em" className="text-gray-500">
        or login with
      </Hr>

      <button
        className="mt-2 px-7 border-red-500  text-red-800 py-2 border"
        onClick={signIn}
      >
        Google
      </button>

      <Link href="/">
        <a className="mt-8 text-primary-900 underline">Forgot Password?</a>
      </Link>
    </div>
  );
};

export default LoginForm;
