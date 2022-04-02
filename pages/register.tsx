import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import RegistrationForm from "../components/Blocks/Auth/RegistrationForm";
import UserCredentials from "../components/Blocks/Auth/UserCredentials";
import AttemptState from "../enum/AttemptState";
import useControlledRequest from "../utils/hook/useControlledRequest";

function Register() {

  const createUser = async (userCredentials: UserCredentials) => {
    return await axios
      .post("/api/user", userCredentials)
      .catch((error) => error.response);
  };

  return (
    <div className="flex h-full">
      <div className=" px-8 text-white hidden md:flex w-2/5 h-full  bg-black shrink-0 border-r-8 border-primary-600 justify-center flex-col">
        <h1 className="text-transparent bg-gradient-to-tr from-primary-300  to-primary-600 bg-clip-text  text-5xl font-extrabold max-w-[35ch] w-fit">
          Productivity is one step away !!!
        </h1>
        <br />
        <h2 className="text-primary-300 text-xl">
          join a community of doers and you too start doing !
        </h2>
      </div>

      <div className="bg-gray-50 w-full flex relative overflow-auto py-12">
        
        <RegistrationForm createUser={createUser} redirectURL={"/dashboard"} />

        <nav className="absolute text-gray-600 right-0 px-10  top-0 py-2">
          Have an account? &nbsp;
          <Link href={"/login"}>
            <a className="text-primary-600 border-b-2 border-dotted border-primary-800 ">
              Login
            </a>
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default Register;
