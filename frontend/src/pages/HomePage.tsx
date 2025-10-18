// export const HomePage = () => {
//   return (
//     <div className="min-h-screen flex flex-col">
//       {/* Header */}
//       <header className="flex justify-between items-center px-8 py-4 bg-[#202020] text-white">
//         <h1 className="text-2xl font-bold">Chatify</h1>
//         <div className="flex gap-4">
//           <button className="px-4 py-2 border border-[#A2A970] rounded hover:bg-[#A2A970] hover:text-black transition">
//             Login
//           </button>
//           <button className="px-4 py-2 bg-[#A2A970] rounded text-black hover:bg-green-600 transition">
//             Sign Up
//           </button>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 gap-10 md:gap-20 bg-[#1A1A24] text-white">
//         <div className="flex-1 space-y-6">
//           <h2 className="text-4xl md:text-5xl font-bold">
//             Connect with your friends instantly
//           </h2>
//           <p className="text-gray-400 text-lg">
//             Chatify brings all your conversations, calls, and notifications in
//             one place.
//           </p>
//           <button className="px-6 py-3 bg-[#A2A970] rounded text-black font-semibold hover:bg-green-600 transition">
//             Get Started
//           </button>
//         </div>
//         <div className="flex-1">
//           {/* Placeholder for hero image */}
//           <img
//             src="https://via.placeholder.com/400x400.png?text=Chat+UI"
//             alt="Chatify app"
//             className="rounded-lg shadow-lg"
//           />
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="px-8 py-20 bg-[#202020] text-white">
//         <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
//         <div className="grid md:grid-cols-3 gap-12">
//           <div className="flex flex-col items-center text-center gap-4">
//             <div className="text-4xl">💬</div>
//             <h4 className="text-xl font-semibold">Real-time Chat</h4>
//             <p className="text-gray-400">
//               Send messages instantly with notifications.
//             </p>
//           </div>
//           <div className="flex flex-col items-center text-center gap-4">
//             <div className="text-4xl">📞</div>
//             <h4 className="text-xl font-semibold">Video & Audio Calls</h4>
//             <p className="text-gray-400">
//               Connect face-to-face or voice-to-voice anytime.
//             </p>
//           </div>
//           <div className="flex flex-col items-center text-center gap-4">
//             <div className="text-4xl">🔔</div>
//             <h4 className="text-xl font-semibold">Notifications</h4>
//             <p className="text-gray-400">
//               Never miss an important message or call.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="px-8 py-6 bg-[#18181B] text-gray-400 text-center">
//         &copy; {new Date().getFullYear()} Chatify. All rights reserved.
//       </footer>
//     </div>
//   );
// };

import { motion } from "framer-motion";

export const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F0F11] text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-4 bg-[#202020] sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-wide text-[#A2A970]">
          Chatify
        </h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-[#A2A970] rounded hover:bg-[#A2A970] hover:text-black transition">
            Login
          </button>
          <button className="px-4 py-2 bg-[#A2A970] rounded text-black font-semibold hover:bg-green-600 transition">
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 gap-10 md:gap-20">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6"
        >
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Chat <span className="text-[#A2A970]">smarter</span>, not harder
          </h2>
          <p className="text-gray-400 text-lg md:text-xl">
            Chatify brings all your conversations, calls, and notifications into
            one sleek app.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#A2A970] rounded text-black font-semibold mt-4 hover:bg-green-600 transition"
          >
            Get Started
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          {/* Hero image / app mockup */}
          <img
            src="https://via.placeholder.com/400x400.png?text=Chat+UI"
            alt="Chatify app"
            className="rounded-2xl shadow-2xl border border-[#2A2A35]"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-8 py-20 bg-[#18181B]">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Features
        </h3>
        <div className="grid md:grid-cols-3 gap-12">
          {[
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
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="flex flex-col items-center text-center gap-4 p-6 rounded-xl bg-[#202020] hover:bg-[#27272A] transition"
            >
              <div className="text-5xl">{feature.icon}</div>
              <h4 className="text-xl font-semibold">{feature.title}</h4>
              <p className="text-gray-400">{feature.desc}</p>
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
