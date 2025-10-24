import { motion } from "framer-motion";
import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const { signUp, isLoaded, setActive } = useSignUp();
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // console.log("Signing up:", { name, email, password });
    if (!isLoaded) {
      setLoading(false);
      return;
    }

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName: name,
      });

      if (result.status === "complete") {
        // console.log("Registered in clerk");

        // await fetch("http://localhost:3000/register", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ name, email, password }),
        // });

        await setActive({ session: result.createdSessionId });

        console.log("Signup successful, redirecting...");
        // Navigate to home page (which will sync user to backend)
        navigate("/");
      } else if (result.status === "missing_requirements") {
        // Prepare email verification
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setVerifying(true);
        setError("");
      } else {
        console.log("Unexpected status:", result.status);
        setError("Signup incomplete. Please try again.");
      }
    } catch (err: any) {
      console.error("Signup failed:", err);
      setError(err.errors?.[0]?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!isLoaded) {
      setLoading(false);
      return;
    }

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      console.log("Verification result:", result.status);

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        console.log("Verification successful, redirecting...");
        navigate("/");
      } else {
        console.log("Verification incomplete:", result.status);
        setError("Verification incomplete. Please try again.");
      }
    } catch (err: any) {
      console.error("Verification failed:", err);
      setError(err.errors?.[0]?.message || "Invalid verification code.");
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    if (!isLoaded) return;

    try {
      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setError("");
      alert("Verification code resent!");
    } catch (err: any) {
      console.error("Resend failed:", err);
      setError("Failed to resend code. Please try again.");
    }
  };

  // Verification screen
  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0F0F11] text-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-[#18181B] rounded-3xl shadow-2xl p-8 border border-[#2A2A35]"
        >
          <h2 className="text-3xl font-bold text-center text-[#A2A970] mb-6">
            Verify Your Email
          </h2>

          <p className="text-gray-400 text-center mb-6">
            We sent a verification code to <strong>{email}</strong>
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-xl text-red-500 text-sm">
              {error}
            </div>
          )}

          <form className="flex flex-col gap-4" onSubmit={handleVerification}>
            <input
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#202020] border border-[#2A2A35] focus:border-[#A2A970] outline-none transition text-center text-2xl tracking-widest"
              required
              disabled={loading}
              maxLength={6}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 mt-2 bg-[#A2A970] rounded-xl font-semibold text-black hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={!isLoaded || loading}
            >
              {loading ? "Verifying..." : "Verify Email"}
            </motion.button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={resendCode}
              className="text-[#A2A970] hover:underline text-sm"
              disabled={loading}
            >
              Resend verification code
            </button>
          </div>

          <button
            onClick={() => setVerifying(false)}
            className="text-gray-400 hover:text-white text-sm mt-4 w-full text-center"
          >
            ← Back to signup
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F11] text-white px-4">
      <div id="clerk-captcha"></div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-[#18181B] rounded-3xl shadow-2xl p-8 border border-[#2A2A35]"
      >
        <h2 className="text-3xl font-bold text-center text-[#A2A970] mb-6">
          Create Account
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded-xl text-red-500 text-sm">
            {error}
          </div>
        )}

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
            minLength={8}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 mt-2 bg-[#A2A970] rounded-xl font-semibold text-black hover:bg-green-600 transition"
            type="submit"
            disabled={!isLoaded || loading}
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
