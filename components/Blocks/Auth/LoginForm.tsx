import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Url } from "url";
import AttemptState from "../../../enum/AttemptState";
import useControlledRequest from "../../../utils/hook/useControlledRequest";
import DynamicHeight from "../../Effect/DynamicHeight";
import Button from "../../HTMLTags/Button";
import Hr from "../../HTMLTags/Hr";
import Input from "../../HTMLTags/Input";
import Notice from "../../HTMLTags/Notice";
import GoogleAuthHeader from "./GoogleAuthHeader";
import UserCredentials from "./UserCredentials";

interface Props {
  logUserIn: (userCredentials: UserCredentials) => Promise<any>;
  redirectURL?: Url | string;
}

const LoginForm: React.FC<Props> = ({ logUserIn, redirectURL }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
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
  }, [controller.status]);

  return (
    <div
      className="flex flex-col  max-w-full p-8 bg-white border-2 border-gray-300 rounded-md h-fit m-auto w-[26rem]"
      onSubmit={handleSubmit(requestUserLogin)}
    >
      <GoogleAuthHeader />
      <form className="flex flex-col">
        <h1 className="text-3xl font-extrabold text-primary-800 mb-4">Login</h1>

        <DynamicHeight dependencies={[controller.status]}>
          {controller.status === 401 ? (
            <Notice color={"red"}>Wrong username or password</Notice>
          ) : (
            ""
          )}
        </DynamicHeight>

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
        {" "}
        or login with{" "}
      </Hr>

      <Button className="mt-2 px-7 border-red-500  text-red-800 py-2 border">
        Google
      </Button>

      <a className="mt-8 text-primary-900 underline">Forgot Password?</a>
    </div>
  );
};

export default LoginForm;
