import { motion } from "framer-motion";
import React, { useState } from "react";
import FloatingShape from "../components/FloatingShape";
import { CloudLightning, Lock, Mail, User, UserKey } from "lucide-react";
import Input from "../components/Input";
import { Link } from "react-router";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
  });

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
        {/* SIGNUP FORM - LEFT SIDE */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-2 flex items-center justify-start gap-2">
            <CloudLightning className="size-9 text-warning" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-warning tracking-wider">
              ThunderCoil
            </span>
          </div>

          <div className="w-full">
            <form>
              <div className="space-y-2">
                {/* HEADER PART */}
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join ThunderCoil and start your connections with your
                    friends!
                  </p>
                </div>

                <div className="space-y-1">
                  {/* fullname */}
                  <Input
                    icon={User}
                    labelName="Full Name"
                    type="text"
                    placeholder="Full Name"
                    value={signupData.fullName}
                    onChange={(e) => {
                      setSignupData({
                        ...signupData,
                        fullName: e.target.value,
                      });
                    }}
                    required
                  />
                  {/* Username */}
                  <Input
                    icon={UserKey}
                    labelName="User Name"
                    type="text"
                    placeholder="Enter your username"
                    value={signupData.userName}
                    onChange={(e) => {
                      setSignupData({
                        ...signupData,
                        userName: e.target.value,
                      });
                    }}
                    required
                  />
                  {/* email */}
                  <Input
                    icon={Mail}
                    labelName="Email"
                    type="email"
                    placeholder="Email Address"
                    value={signupData.email}
                    onChange={(e) => {
                      setSignupData({ ...signupData, email: e.target.value });
                    }}
                    required
                  />
                  {/* password */}
                  <Input
                    icon={Lock}
                    labelName="Password"
                    type="password"
                    placeholder="Enter password"
                    value={signupData.password}
                    onChange={(e) => {
                      setSignupData({
                        ...signupData,
                        password: e.target.value,
                      });
                    }}
                    required
                  />

                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                <button className="btn btn-primary w-full">
                  {false ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* SIGNUP FORM - RIGHT SIDE */}
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
            <div className="relative aspect-square max-w-sm mx-auto">
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

export default SignUpPage;
