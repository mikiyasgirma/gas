import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Spinner from "../components/Spinner";
import useAuthStore from "../store/authStore";

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const currentUser = useAuthStore((state) => state.currentUser);
  const logIn = useAuthStore((state) => state.login);
  const loading = useAuthStore((state) => state.loading);
  const router = useRouter();
  console.log("current user", currentUser);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    logIn(email, password);
  };

  if (currentUser) {
    router.push("/");
  }

  const backgound =
    "https://images.unsplash.com/photo-1585740452884-2a29a1d21514?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";

  return (
    <div
      className="bg-no-repeat bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgound})` }}
    >
      <div className="absolute bg-gradient-to-b from-primary to-accent opacity-75 inset-0 z-0"></div>
      <div className="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">
            <img src="" className="mb-3" />
            <h1 className="mb-3 font-bold text-5xl">Welcome Back </h1>
            <p className="pr-3">
              This is Balehubet Gas Staitions Availbility and Queue chcker app
              admin dashboard
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => submitHandler(e)}
          className="flex justify-center self-center  z-10"
        >
          <div className="p-12 bg-white mx-auto rounded-2xl w-100 ">
            <div className="mb-4">
              <h3 className="font-semibold text-2xl text-gray-800">Sign In </h3>
              <p className="text-gray-500">Please sign in to your account.</p>
            </div>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 tracking-wide">
                  Email
                </label>
                <input
                  className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type=""
                  placeholder="mail@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </label>
                <input
                  className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="text-green-400 hover:text-green-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              {loading ? (
                <Spinner type="balls" color="#2B3A55" />
              ) : (
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-primary  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
            <div className="pt-5 text-center text-gray-400 text-xs">
              <span>
                Copyright © 2021-2022
                <a
                  href="https://codepen.io/uidesignhub"
                  rel=""
                  target="_blank"
                  title="Ajimon"
                  className="text-green hover:text-primary "
                >
                  AJI
                </a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;
