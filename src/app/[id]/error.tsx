"use client";
import React,{useEffect} from "react";
import { useRouter } from "next/navigation";

function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {

  const router = useRouter();

  useEffect(() => {
    console.log("Error", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>ErrorPage</h2>
      <h1 className="text-3xl font-bold text-red-500">
        Oops! Something went wrong
      </h1>
      <p className="textgray-500">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Try Again
      </button>
      <button
      onClick={()=> router.push("/")}
      className="mt-2 px-4 py-2 bg-gray-500 text-white rounded"
      >
        Go Home
      </button>
    </div>
  );
}

export default ErrorPage;
