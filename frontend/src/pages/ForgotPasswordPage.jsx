import { motion } from "framer-motion";
import React from "react";
import { useState } from "react";
import FloatingShape from "../components/FloatingShape";
import Input from "../components/Input";
import { Loader, Mail } from "lucide-react";
import { useForgotPassword } from "../hooks/useAuthUpdate.js";
import { Link } from "react-router";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { forgotPasswordMutation, isPending, error } = useForgotPassword();

  const handleSubmit = async (e) => {
    e.preventDefault();
    forgotPasswordMutation(email, {
      onSuccess: () => setIsSubmitted(true),
      onError: () => setIsSubmitted(false),
    });
  };

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 relative overflow-hidden">
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-8  bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden "
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
          Forgot Password
        </h2>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <p className="text-gray-300 mb-6 text-center">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-400 to-cyan-500
              via-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-500 hover:via-blue-800 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 mt-2"
              type="submit"
            >
              {isPending ? (
                <Loader className="animate-spin mx-auto size-6" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="size-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Mail className="size-8 text-white" />
            </motion.div>
            <p className="text-gray-300 mb-6">
              If an account exists for {email}, you will receive a password
              reset link shortly.
            </p>
          </div>
        )}

        <div className="text-center mt-4 text-white">
          <p className="text-sm uppercase">
            Click here for{" "}
            <Link to="/login" className="text-blue-300 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
