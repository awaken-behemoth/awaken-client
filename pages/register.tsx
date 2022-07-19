import Head from 'next/head';
import Link from 'next/link';
import { useMutation } from 'react-query';

import RegistrationForm from '../components/Auth/RegistrationForm';
import UserCredentials from '../components/Auth/UserCredentials';
import { createUser } from '../components/Auth/userService';

function Register() {
  const registerMutation = useMutation((credentials: UserCredentials) => {
    return createUser(credentials);
  });

  return (
    <div className="flex h-full" key="Register">
      <Head>
        <title>SignIn awaken</title>
        <meta
          name="description"
          content={
            'Create a new Awaken account. Start being productive and join a community of doers.'
          }
        ></meta>
      </Head>

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
        <RegistrationForm
          mutation={registerMutation}
          redirectURL={'/dashboard'}
        />

        <nav className="absolute text-gray-600 right-0 px-10  top-0 py-2">
          Have an account? &nbsp;
          <Link href={'/login'}>
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
