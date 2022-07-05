import Button from "../components/HTMLTags/Button";

function Dashboard() {

  return (
    <div className="h-96 flex  place-items-center flex-col text-center pt-48 place-content-center gap-4">
      <h1 className=" text-6xl font-extrabold max-w-[35ch] w-fit">
        Dashboard and user management section is coming
      </h1>
      <Button
        className={
          "text-3xl bg-primary-600 mt-8 text-white px-10 py-2 rounded-sm"
        }
      >
        Get Started
      </Button>
    </div>
  );
}

export default Dashboard;
