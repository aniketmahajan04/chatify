import { motion } from "framer-motion";
import { useState } from "react";

export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signing up:", { name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F11] text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-[#18181B] rounded-3xl shadow-2xl p-8 border border-[#2A2A35]"
      >
        <h2 className="text-3xl font-bold text-center text-[#A2A970] mb-6">
          Create Account
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-[#2A2A35] focus:border-[#A2A970] outline-none transition"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-[#2A2A35] focus:border-[#A2A970] outline-none transition"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-[#2A2A35] focus:border-[#A2A970] outline-none transition"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 mt-2 bg-[#A2A970] rounded-xl font-semibold text-black hover:bg-green-600 transition"
            type="submit"
          >
            Sign Up
          </motion.button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-[#A2A970] hover:underline">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};
