import { motion } from "framer-motion";

export const HomePage = () => {
  const features = [
    {
      icon: "💬",
      title: "Real-time Chat",
      desc: "Instant messaging with notifications.",
    },
    {
      icon: "📞",
      title: "Video & Audio Calls",
      desc: "Connect face-to-face or voice-to-voice anytime.",
    },
    {
      icon: "🔔",
      title: "Notifications",
      desc: "Never miss an important message or call.",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-[#0F0F11] text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute w-96 h-96 bg-gradient-to-r from-[#A2A970]
           to-[#5AF1C1] rounded-full opacity-10 blur-3xl top-[-20%] left-[-10%]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
          className="absolute w-80 h-80 bg-gradient-to-r from-[#F45A97] to-[#FFC76D] 
          rounded-full opacity-10 blur-3xl bottom-[-20%] right-[-10%]"
        />
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-[#202020]/90
       backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-wide text-[#A2A970]">
          Chatify
        </h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-[#A2A970] rounded hover:bg-[#A2A970] 
          hover:text-black transition">
            Login
          </button>
          <button className="px-4 py-2 bg-[#A2A970] rounded text-black font-semibold 
          hover:bg-[#b2b97b] transition">

            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 gap-10 md:gap-20">
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex-1 space-y-6"
        >
          <h2 className="text-5xl md:text-6xl font-bold leading-tight bg-clip-text 
          text-transparent bg-gradient-to-r from-[#A2A970] via-[#5AF1C1] to-[#F45A97] animate-gradient-text">
            Chat <span className="text-white/80">smarter</span>, not harder
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">
            Chatify brings all your conversations, calls, and notifications into
            one sleek app.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#A2A970] rounded text-black font-semibold mt-4 
            hover:bg-[#b2b97b] transition"
          >
            Get Started
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: [0, -10, 0], opacity: 1 }}
          transition={{ duration: 3, repeat: Infinity }}
          className="flex-1"
        >
          <img
            src="https://via.placeholder.com/400x400.png?text=Chat+UI"
            alt="Chatify app"
            className="rounded-3xl shadow-2xl border border-[#2A2A35] w-full"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Features
        </h3>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="flex flex-col items-center text-center gap-4 p-6 rounded-2xl bg-white/5 
              backdrop-blur-md border border-white/10 hover:scale-105 transition-transform cursor-pointer"
            >
              <div className="text-5xl">{f.icon}</div>
              <h4 className="text-xl font-semibold">{f.title}</h4>
              <p className="text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 bg-[#202020] text-gray-400 text-center">
        &copy; {new Date().getFullYear()} Chatify. All rights reserved.
      </footer>
    </div>
  );
};
