"use client";

import Login from "@/app/_components/forms/login";

const SignInPage = () => {
  return (
    <div className="flex border rounded-md shadow-2xl flex-col w-full  bg-primary md:w-[100%] h-full min-h-screen items-center justify-center   py-5 px-1">
      <Login />
    </div>
  );
};

export default SignInPage;
