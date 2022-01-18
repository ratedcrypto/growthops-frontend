import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center min-h-screen">
      <h1 className="text-3xl font-bold">Welcome to Plants Tracker</h1>
      <p className="font-bold">
        <Link href="/plants">
          <a className="text-blue-600">Get started</a>
        </Link>
      </p>
    </div>
  );
};

export default Home;
