"use client";

import Link from "next/link";
import LoginLogo from "../../components/login/LoginLogo";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values) => {
      setErrorMessage("");
      const { confirmPassword, ...filteredValues } = values; // Exclude confirmPassword
      try {
        const response = await fetch("http://localhost:8888/sign-up", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filteredValues),
        });
        const data = await response.json();
        if (response.ok) {
          router.push("/");
        } else {
          setErrorMessage(data.message || "An error occurred");
        }
      } catch (error) {
        setErrorMessage("Network Error");
      }
    },
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
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
              <h1 className="leading-8 text-[24px] font-bold">
                Create Geld account
              </h1>
              <p className="text-lg text-[#334155]">
                Sign up below to create your Wallet account
              </p>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            {/* Name field */}
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-600">{formik.errors.name}</div>
            ) : null}

            {/* Email field */}
            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              className="input input-bordered w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600">{formik.errors.email}</div>
            ) : null}

            {/* Password field */}
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600">{formik.errors.password}</div>
            ) : null}

            {/* Confirm Password field */}
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-Password"
              className="input input-bordered w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-600">
                {formik.errors.confirmPassword}
              </div>
            ) : null}

            {/* Sign-up Button */}
            <button
              type="submit"
              className="w-full border bg-[#0166FF] text-white rounded-2xl h-[48px] pl-5 text-[20px]"
            >
              Sign up
            </button>

            {/* Redirect to Login */}
            <div className="flex justify-center gap-3 mt-8 text-base">
              <p>Already have an account?</p>
              <Link href={"/"}>
                <button className="text-[#0166FF]">Log in</button>
              </Link>
            </div>

            {/* Display error message if any */}
            {errorMessage && (
              <div className="text-red-600 mt-4">{errorMessage}</div>
            )}
          </form>
        </div>
      </div>
      <div className="w-[50%] bg-[#0166FF]"></div>
    </div>
  );
};

export default SignUp;
