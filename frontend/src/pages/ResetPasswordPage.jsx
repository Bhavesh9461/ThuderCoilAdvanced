import React, { useState } from "react";
import { useResetPassword } from "../hooks/useAuthUpdate.js";
import { Link, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import FloatingShape from "../components/FloatingShape.jsx";
import Input from "../components/Input.jsx";
import { Loader, Lock, LockKeyhole } from "lucide-react";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter.jsx";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()

  const { resetPasswordMutation, isPending, error } = useResetPassword();

  const { token } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    resetPasswordMutation({token, password},{
        onSuccess: ()=>{
            setTimeout(() => {
                navigate("/login")
            }, 2000);
        }
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
        className="p-8 max-w-5xl w-full lg:w-[40%] bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden text-white/70 "
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">
          Reset Password
        </h2>

        {error && (
          <p className="text-sm mb-4 text-red-500">
            {error?.response?.data?.message || error?.message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            icon={LockKeyhole}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <PasswordStrengthMeter password={password} />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-400 to-cyan-500
                    via-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-cyan-500 hover:via-blue-800 transition duration-200 focus:outline-none focus:ring-2 mt-3 sm:mt-4 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <Loader className="animate-spin mx-auto size-6" />
            ) : (
              "Set New Password"
            )}
          </motion.button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm uppercase">
            Click here for {" "}
            <Link to="/login" className="text-blue-300 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

      </motion.div>
    </div>
  );
};

export default ResetPasswordPage;
