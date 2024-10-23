"use client";
import Link from "next/link";
import LoginLogo from "./LoginLogo";
import { useEffect, useState } from "react";

const Login = () => {
  const [data, setData] = useState(true);
  const [error, setError] = useState(null);
  const BACKEND_ENDPOINT = "https://the-boys-14.onrender.com/";

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      name: event.target.name.value,
      password: event.target.password.value,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };

    try {
      const response = await fetch(BACKEND_ENDPOINT, options);
      const result = await response.json();
      setData(result);
      setError(false);
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="w-full flex justify-center h-screen">
      <div className="w-[50%] flex justify-center items-center">
        <div className="w-[384px] h-[426px]">
          <div className="flex justify-center flex-col items-center">
            <div className="flex justify-center items-center gap-2 mb-11">
              <LoginLogo />
              <p className="font-bold text-[24px]">Geld</p>
            </div>
            <div className="flex flex-col items-center gap-2 mb-11">
              <h1 className="leading-8 text-[24px] font-bold">Welcome Back</h1>
              <p className="text-lg text-[#334155]">
                Welcome back, Please enter your details
              </p>
            </div>
          </div>
          <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              type="text"
              placeholder="User Name"
              className="input w-full border bg-[#F3F4F6] rounded-lg h-[48px] pl-5"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input w-full border bg-[#F3F4F6] rounded-lg h-[48px] pl-5"
            />
            {data?.success ? (
              <Link href="dashboard">
                <button className="w-full border bg-[#0166FF] text-white rounded-2xl h-[48px] pl-5 text-[20px]">
                  Log in
                </button>
              </Link>
            ) : (
              <button className="w-full border bg-[#0166FF] text-white rounded-2xl h-[48px] pl-5 text-[20px]">
                Log in
              </button>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-center gap-3 mt-8 text-base">
              <p className=" text-[#0F172A]">don't have account?</p>
              <Link href={"sign-up"}>
                <button className="text-[#0166FF]">Sign up</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
      <div className="w-[50%] bg-[#0166FF]"></div>
    </div>
  );
};
export default Login;