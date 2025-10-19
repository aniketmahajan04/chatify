import { AnimatePresence, motion } from "framer-motion";

interface ActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    actions: { label: string; onClick: () => void; destructive?: boolean }[];
    position?: { x: number, y: number};
}

export const ActionModal = ({
    isOpen,
    onClose,
    title = "Actions",
    actions,
    position
}: ActionModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 bg-black/40 flex items-end md:items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    {/* Modal Card */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="
              w-full md:w-80 bg-[#18181B] text-white
              rounded-t-3xl md:rounded-2xl shadow-2xl border border-zinc-700
              p-4 space-y-3
            "
            style={
                position ? {
                    top: position.y,
                    left: position.x,
                    transform: "translate(0, 0)",
                } : {
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }
            }
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center border-b border-zinc-700 pb-2">
                            <h2 className="text-lg font-semibold text-[#A2A970]">
                                {title}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-200 transition"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 pt-2">
                            {actions.map((action, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        action.onClick();
                                        onClose();
                                    }}
                                    className={`text-left px-3 py-2 rounded-lg transition ${
                                        action.destructive
                                            ? "text-red-400 hover:bg-red-500/20"
                                            : "text-gray-200 hover:bg-zinc-700/50"
                                    }`}
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
