import { AnimatePresence, motion } from "framer-motion";

type Notification = {
  id: number;
  sender: string;
  avatar: string;
  message: string;
};

interface Props {
  notifications: Notification[];
  onAccept: (id: number) => void;
  onReject: (id: number) => void;
  onClose: () => void;
}

export const Notifications = ({
  notifications,
  onAccept,
  onReject,
  onClose,
}: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-end md:items-start md:justify-end bg-black/40 md:bg-transparent"
      >
        {/* ✅ Responsive container */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="
            w-full md:w-80 
            h-full md:h-auto 
            bg-[#18181B] 
            text-white 
            rounded-none md:rounded-2xl 
            shadow-lg border border-zinc-700 
            overflow-hidden 
            flex flex-col
          "
        >
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-700">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 transition"
            >
              ✕
            </button>
          </div>

          {/* Notification list */}
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center py-6 text-gray-500">
                No new notifications
              </p>
            ) : (
              notifications.map((n) => (
                <motion.div
                  key={n.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800 hover:bg-zinc-800/50"
                >
                  <img
                    src={n.avatar}
                    alt={n.sender}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{n.sender}</p>
                    <p className="text-xs text-gray-400">{n.message}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onAccept(n.id)}
                      className="text-green-400 hover:text-green-300 text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => onReject(n.id)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Reject
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
