"use client";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import LoginLogo from "./LoginLogo";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage("");
      try {
        const response = await fetch("http://localhost:3030/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        console.log("email", email.value);
        console.log("pass", password);
        console.log("data", data);

        if (response.ok) {
          toast.success("Login successful!");
          localStorage.setItem("isLoggedIn", "true");
          router.push("/dashboard");
        } else {
          setErrorMessage(data.message || "Invalid credentials");
        }
      } catch (error) {
        setErrorMessage("Network error");
      }
    },
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      toast.success("you already login");
      router.push("/dashboard");
    }
  }, [router]);

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
              <p className="text-lg ">
                Welcome back, Please enter your details
              </p>
            </div>
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div className="">
              <label htmlFor="email" className="block ">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.errors.password ? (
                <div className="text-red-600">{formik.errors.password}</div>
              ) : null}
            </div>

            {errorMessage && (
              <div className="mb-4 text-red-600">{errorMessage}</div>
            )}

            <button
              type="submit"
              className="w-full border bg-[#0166FF] text-white rounded-2xl h-[48px] pl-5 text-[20px]"
            >
              Log In
            </button>
          </form>
          <div className="flex justify-center items-center py-3 w-full gap-3">
            <p>Dont have an Account?</p>
            <Link href="/sign-up">
              <button className="btn btn-link text-white p-2 rounded-md w-full">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[50%] bg-[#0166FF]"></div>
    </div>
  );
};
export default Login;
