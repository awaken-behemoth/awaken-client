import React from "react";
import { useForm } from "react-hook-form";
import Button from "../../HTMLTags/Button";
import Hr from "../../HTMLTags/Hr";
import Input from "../../HTMLTags/Input";

function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <div
      className="flex flex-col p-8 bg-white border-2 border-gray-300 rounded-md h-fit m-auto"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <form className="flex flex-col">
        <h1 className="text-3xl font-extrabold text-primary-800 mb-4">Login</h1>

        <Input
          label="Email"
          type="email"
          {...register("email", { required: true })}
        ></Input>

        <Input
          label="Password"
          type="password"
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
}

export default LoginForm;
