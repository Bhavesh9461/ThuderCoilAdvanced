import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useVerifyEmail } from "../hooks/useAuthUpdate.js";
import { useEffect } from "react";
import FloatingShape from "../components/FloatingShape.jsx";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const { verifyEmailMutation, verifyPending, verifyError } = useVerifyEmail();

  const handleChange = (index, value) => {
    const newCode = [...code];
    if (code.every((digit) => digit !== "") && value) {
      return;
    }

    //handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      //focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      //move focus to the next input filed if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    console.log(typeof verificationCode);
    
    verifyEmailMutation({code: verificationCode});
  };
  

  // auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

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
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                type="text"
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                // maxLength={1}
                value={digit}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  handleChange(index, value);
                }}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-500 rounded-lg 
                          focus:border-blue-500 focus:outline-none"
              />
            ))}
          </div>

          {/* Error Message */}
          {verifyError && (
            <p className="text-red-500 font-semibold mt-2">
              {verifyError?.response?.data?.message || verifyError?.message}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileDrag={{ scale: 0.95 }}
            type="submit"
            disabled={verifyPending || code.some((digit) => !digit)}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:opacity-50"
          >
            {verifyPending ? "Verifying..." : "Verify Email"}
          </motion.button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-white">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerificationPage;
