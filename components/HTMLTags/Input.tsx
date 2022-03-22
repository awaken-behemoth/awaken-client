import { HTMLProps } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <>
      <label htmlFor="password" className="my-2 text-gray-600">
        {label}
      </label>
      <input
        className="px-2 py-2 bg-primary-100 border-2 border-primary-500 rounded-md outline-none focus:outline-primary-800"
        {...props}
      />
      <br />
    </>
  );
};

export default Input;
