import Link from "next/link";
import Button from "../Tags/Button";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  return (
    <div className="w-full fixed flex">
      <div className="w-full max-w-screen-lg m-auto flex">
        <Link href={"/login"}>
          <Button className="inline-block ml-auto px-9 py-1 text-white bg-primary-700 active:bg-primary-500 my-2 rounded-sm">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
