import { useSignIn, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const LoginPage = () => {
  const { signIn, isLoaded } = useSignIn();
  const { getToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      //Start the email/password sign-in
      const attempt = await signIn.create({
        identifier: email,
        password,
      });

      if (attempt.status === "complete") {
        console.log("Login successful!");
        await fetch("http://localhost:3000/sync-user", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
        });
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
      console.log("Redirecting to google login");
    } catch (err) {
      console.error("Google login failed:", err);
    }
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
          Login to Chatify
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
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
            Login
          </motion.button>
        </form>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 mt-4 bg-[#4285F4] rounded-xl font-semibold text-white hover:bg-blue-600 transition flex items-center justify-center gap-2"
          onClick={handleGoogleLogin}
        >
          <img src="/google-logo.png" className="w-5 h-5" alt="Google" />
          Continue with Google
        </motion.button>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <a href="/register" className="text-[#A2A970] hover:underline">
            Register
          </a>
        </p>
      </motion.div>
    </div>
  );
};
