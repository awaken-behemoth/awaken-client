import Link from "next/link";
import LoginForm from "../components/Blocks/Auth/LoginForm";

function Login() {

  return (
    <div className="flex h-full">
      <div className=" px-8 text-white hidden md:flex w-2/5 h-100%  bg-black shrink-0 border-r-8 border-primary-600 justify-center flex-col">
        <h1 className="text-transparent bg-gradient-to-tr from-red-500  to-primary-800 bg-clip-text  text-5xl font-extrabold max-w-[35ch] w-fit">
          Welcome back, we missed you !!!
        </h1>
        <br />
        <h2 className="text-primary-200 text-xl">
          Let continue being proactive. The world is waiting for you!
        </h2>
      </div>
      <div className="bg-gray-50 w-full flex relative overflow-auto py-12">
        <LoginForm />

        <nav className="absolute text-gray-600 right-0 px-10  top-0 py-2">
          New here ? &nbsp;
          <Link href={"/register"}>
            <a className="text-primary-600 border-b-2 border-dotted border-primary-800 ">
              Register
            </a>
          </Link>
        </nav>
      </div>
    </div>
  );
}

Login.navSettings = {
  display: false,
};

export default Login;
