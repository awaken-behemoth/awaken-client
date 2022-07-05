import Link from "next/link";
import Button from "../HTMLTags/Button";
import Layout from "./Layout";

const DefaultLayout: Layout= (page) => {
  return (
    <>
      <div className="w-full fixed flex">
        <div className="w-full max-w-screen-lg m-auto flex">
          <Link href={"/login"} passHref>
            <Button className="inline-block ml-auto px-9 py-1 text-white bg-primary-600 active:bg-primary-500 my-2 rounded-sm">
              Login
            </Button>
          </Link>
        </div>
      </div>
      {page}
    </>
  );
};

export default DefaultLayout;
