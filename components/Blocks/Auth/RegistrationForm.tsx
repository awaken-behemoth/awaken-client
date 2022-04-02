import React, { useEffect } from "react";
import Hr from "../../HTMLTags/Hr";
import Input from "../../HTMLTags/Input";
import { useForm } from "react-hook-form";
import Button from "../../HTMLTags/Button";
import UserCredentials from "./UserCredentials";
import Head from "next/head";
import Script from "next/script";
import useGoogleAuth from "./useGoogleAuth";
import GoogleAuthHeader from "./GoogleAuthHeader";
import useControlledRequest from "../../../utils/hook/useControlledRequest";
import AttemptState from "../../../enum/AttemptState";
import { Url } from "url";
import { useRouter } from "next/router";
import DynamicHeight from "../../Effect/DynamicHeight";
import Notice from "../../HTMLTags/Notice";

interface Props {
  createUser: (userCredentials: UserCredentials) => Promise<any>;
  redirectURL?: Url | string;
}

const RegistrationForm: React.FC<Props> = ({ createUser, redirectURL }) => {
  const router = useRouter();
  const controller = useControlledRequest(2000);
  const requestUserCreation = (userCredentials: UserCredentials) => {
    controller.makeRequest(async () => {
      return await createUser(userCredentials);
    });
  };

  useEffect(() => {
    if (redirectURL && controller.status == 200) {
      router.push(redirectURL);
    }
  }, [controller.status]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{
    password: string;
    email: string;
    password_confirmation: string;
  }>({
    resolver: (input) => {
      if (input.password !== input.password_confirmation)
        return { errors: { password: "password mismatch" }, values: input };
      else return { values: input, errors: {} };
    },
  });

  const { login } = useGoogleAuth();

  return (
    <div
      className="flex flex-col p-8 m-auto bg-white border-2 border-gray-300 rounded-md w-[26rem]"
      onSubmit={handleSubmit(requestUserCreation)}
    >
      <GoogleAuthHeader />

      <form className="flex flex-col">
        <h1 className="text-3xl font-extrabold text-primary-800 mb-4">
          Register
        </h1>

        <DynamicHeight dependencies={[controller.status]}>
          {controller.status === 409 &&
          controller.state !== AttemptState.LOADING ? (
            <Notice color={"red"}>
              Account using these email has already been registered{" "}
            </Notice>
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

        <Input
          label="confirm password"
          type="password"
          autoComplete="new-password"
          {...register("password_confirmation", { required: true })}
        ></Input>

        <DynamicHeight dependencies={[errors.password]}>
          {errors.password && <Notice color={"yellow"} className={" mb-2"}> {errors.password}</Notice>}
        </DynamicHeight>

        <Button
          type="submit"
          className="mt-2 px-7 bg-primary-700 text-white py-2 mb-4 active:bg-primary-600"
          style={{
            opacity: controller.state === AttemptState.LOADING ? 0.9 : 1,
          }}
        >
          Register
        </Button>
      </form>

      <Hr padding="0.5em" className="text-gray-500">
        or register with
      </Hr>

      <Button
        className="mt-2 px-7 border-red-500  text-red-800 py-2 border"
        onClick={() => login()}
      >
        Google
      </Button>

      <a className="mt-8 text-primary-900 underline">Forgot Password?</a>
    </div>
  );
};

export default RegistrationForm;
