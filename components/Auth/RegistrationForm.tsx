import { Url } from "url";
import Hr from "../HTMLTags/Hr";
import Input from "../HTMLTags/Input";
import Notice from "../HTMLTags/Notice";
import { useRouter } from "next/router";
import Button from "../HTMLTags/Button";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useGoogleAuth from "./useGoogleAuth";
import UserCredentials from "./UserCredentials";
import GoogleAuthHeader from "./GoogleAuthHeader";
import AttemptState from "../../enum/AttemptState";
import DynamicHeight from "../Effect/DynamicHeight";
import useControlledRequest from "../../utils/hook/useControlledRequest";
import LazyDynamicHeight from "../Effect/LazyDynamicHeight";

interface Props {
  /**
   * The function that should be users to create a new user
   * upon click of the registration or google login button;
   */
  createUser: (userCredentials: UserCredentials) => Promise<{ status: number }>;

  /**
   * Redirection Uri after user registration
   */
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
  }, [controller.status, redirectURL, router]);

  const {
    register,
    handleSubmit,
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

        <LazyDynamicHeight dependencies={[controller.status]}>
          {controller.status === 409 &&
          controller.state !== AttemptState.LOADING ? (
            <Notice color={"red"}>
              Account using these email has already been registered{" "}
            </Notice>
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

        <Input
          label="confirm password"
          type="password"
          autoComplete="new-password"
          {...register("password_confirmation", { required: true })}
        ></Input>

        <DynamicHeight dependencies={[errors.password]}>
          {errors.password && (
            <Notice color={"yellow"} className={" mb-2"}>
              {" "}
              {errors.password}
            </Notice>
          )}
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
