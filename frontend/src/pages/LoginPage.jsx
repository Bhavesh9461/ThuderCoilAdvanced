import React, { useState } from "react";
import FloatingShape from "../components/FloatingShape";
import { motion } from "framer-motion";
import { CloudLightning, Lock, Mail, User } from "lucide-react";
import Input from "../components/Input";
import ActionButton from "../components/ActionButton";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin.js";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 relative overflow-hidden"
      data-theme="forest"
    >
      <FloatingShape
        color="bg-blue-400"
        size="w-64 h-64"
        top="-5%"
        left="10%"
        delay={0}
      />
      <FloatingShape
        color="bg-cyan-400"
        size="w-48 h-48"
        top="70%"
        left="80%"
        delay={5}
      />
      <FloatingShape
        color="bg-gray-300"
        size="w-32 h-32"
        top="40%"
        left="-10%"
        delay={2}
      />

      <motion.div
        initial={{ opacity: 0, y: 160 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 bg-opacity-30 rounded-2xl shadow-xl overflow-hidden backdrop-filter backdrop-blur-xl"
      >
        {/* LOGIN FORM : LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <CloudLightning className="size-9 text-warning" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-warning tracking-wider">
              ThunderCoil
            </span>
          </div>

          {/* Error message */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error?.response?.data?.message || error?.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-3">
                <div>
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to continue your friendships
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  {/* Email */}
                  <Input
                    icon={User}
                    labelName="Username"
                    type="text"
                    placeholder="Username"
                    value={loginData.userName}
                    onChange={(e) => {
                      setLoginData({
                        ...loginData,
                        userName: e.target.value,
                      });
                    }}
                    required
                  />

                  {/* password */}
                  <Input
                    icon={Lock}
                    labelName="Password"
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => {
                      setLoginData({
                        ...loginData,
                        password: e.target.value,
                      });
                    }}
                  />
                  <div className="flex items-center mb-6">
                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-400 hover:underline"
                    >
                      Forgot Password ?
                    </Link>
                  </div>
                  <ActionButton isPending={isPending} btnName={"Sign In"} />

                  {/* switch between login and signup */}
                  <div className="text-center mt-4">
                    <p className="text-sm">
                      Don't have an account?{" "}
                      <Link
                        to="/signup"
                        className="text-primary hover:underline"
                      >
                        Create one
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* LOGIN FORM: RIGHT SIDE */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-blue-500/30 items-center justify-center">
          <div className="p-8 max-w-md relative">
            <FloatingShape
              color="bg-cyan-100"
              size="w-56 h-56"
              top="-30%"
              left="-20%"
              delay={2}
            />
            <FloatingShape
              color="bg-cyan-100"
              size="w-48 h-48"
              top="50%"
              left="50%"
              delay={2}
            />
            {/* Illustration Part */}
            <div className="relative aspect-square max-w-xs mx-auto">
              <img
                src="./illus.png"
                alt="Connection Illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with friends in all region
              </h2>
              <p className="opacity-70">
                Create conversations, make friends, and improve your skills
                together
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
