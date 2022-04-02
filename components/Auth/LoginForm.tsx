import { Url } from "url";
import Hr from "../HTMLTags/Hr";
import Input from "../HTMLTags/Input";
import Button from "../HTMLTags/Button";
import Notice from "../HTMLTags/Notice";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import UserCredentials from "./UserCredentials";
import GoogleAuthHeader from "./GoogleAuthHeader";
import DynamicHeight from "../Effect/DynamicHeight";
import useControlledRequest from "../../utils/hook/useControlledRequest";
import Link from "next/link";
import LazyDynamicHeight from "../Effect/LazyDynamicHeight";

interface Props {
  /**
   * The function that should be users to create a new user
   * upon click of the registration or google login button;
   */

  logUserIn: (userCredentials: UserCredentials) => Promise<{ status: number }>;

  /**
   * Redirection Uri after user registration
   */
  redirectURL?: Url | string;
}

const LoginForm: React.FC<Props> = ({ logUserIn, redirectURL }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const controller = useControlledRequest(2000);

  const requestUserLogin = (userCredentials: UserCredentials) => {
    controller.makeRequest(async () => {
      return await logUserIn(userCredentials);
    });
  };

  useEffect(() => {
    if (redirectURL && controller.status == 200) {
      router.push(redirectURL);
    }
  }, [controller.status, redirectURL, router]);

  return (
    <div
      className="flex flex-col  max-w-full p-8 bg-white border-2 border-gray-300 rounded-md h-fit m-auto w-[26rem]"
      onSubmit={handleSubmit(requestUserLogin)}
    >
      <GoogleAuthHeader />
      <form className="flex flex-col">
        <h1 className="text-3xl font-extrabold text-primary-800 mb-4">Login</h1>

        <LazyDynamicHeight dependencies={[controller.status]}>
          {controller.status === 401 ? (
            <Notice color={"red"}>Wrong username or password</Notice>
          ) : (
            ""
          )}
        </LazyDynamicHeight>

        <Input
          label="Email"
          type="email"
          {...register("email", { required: true })}
        ></Input>

        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          {...register("password", { required: true })}
        ></Input>

        <Button
          type="submit"
          className="mt-2 px-7 bg-primary-700 active:bg-primary-500 text-white py-2 mb-4"
        >
          Login
        </Button>
      </form>
      <Hr padding="0.5em" className="text-gray-500">
        or login with
      </Hr>

      <Button className="mt-2 px-7 border-red-500  text-red-800 py-2 border">
        Google
      </Button>

      <Link href="/">
        <a className="mt-8 text-primary-900 underline">Forgot Password?</a>
      </Link>
    </div>
  );
};

export default LoginForm;
