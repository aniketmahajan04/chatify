import { useSignIn, useAuth } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const { signIn, isLoaded, setActive } = useSignIn();
  const { getToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isLoaded) {
      setLoading(false);
      return;
    }

    try {
      //Start the email/password sign-in
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        // Set the active session first
        await setActive({ session: result.createdSessionId });

        // Sync user to backend database
        try {
          const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${await getToken()}`,
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            console.log("User synced to database successfully!");
          } else {
            console.error("Failed to sync user to database");
          }
        } catch (syncError) {
          console.error("Error syncing user:", syncError);
        }

        console.log("Login successful!");
        navigate("/");
      }
    } catch (err: any) {
      console.error("Login failed", err);
      setError(
        err.errors?.[0]?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
      console.log("Redirecting to google login");
    } catch (err: any) {
      console.error("Google login failed:", err);
      setError("Google login failed. Please try again.");
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

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-xl text-red-500 text-sm">
            {error}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-[#2A2A35] focus:border-[#A2A970] outline-none transition"
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-[#2A2A35] focus:border-[#A2A970] outline-none transition"
            required
            disabled={loading}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 mt-2 bg-[#A2A970] rounded-xl font-semibold text-black hover:bg-green-600 transition"
            type="submit"
            disabled={!isLoaded || loading}
          >
            Login
          </motion.button>
        </form>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 mt-4 bg-[#4285F4] rounded-xl font-semibold text-white hover:bg-blue-600 transition flex items-center justify-center gap-2"
          onClick={handleGoogleLogin}
          disabled={!isLoaded || loading}
        >
          {/* <img src="/google-logo.png" className="w-5 h-5" alt="Google" /> */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
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
