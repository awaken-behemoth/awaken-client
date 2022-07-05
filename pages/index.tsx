import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Button from "../components/HTMLTags/Button";
import DefaultLayout from "../components/Layout/DefaultLayout";

export default function Home() {
  return (
    <div className="h-96 flex  place-items-center flex-col text-center pt-48 place-content-center gap-4">
      <h1 className=" text-6xl font-extrabold max-w-[35ch] w-fit">
        The task Manager that cares about you
      </h1>
      <h2 className="text-3xl">
        We protect your task, So you can focus on doing them !!
      </h2>

      <Button className={"text-3xl bg-primary-600 mt-8 text-white px-10 py-2 rounded-sm"}> Get Started</Button>
    </div>
  );
}

Home.getLayout = DefaultLayout;
