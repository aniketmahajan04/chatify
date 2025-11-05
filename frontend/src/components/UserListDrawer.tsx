import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import { useAllUsers } from "../hooks/useAllUsers";
import { useSendRequest } from "../hooks/useSendRequest";

interface UserListDrawerProp {
    isOpen: boolean;
    // users: { id: number; name: string; avatar: string; bio: string }[];
    onClose: () => void;
    onUserSelect: (user: any) => void;
}

export const UserListDrawer = ({
    isOpen,
    // users,
    onClose,
    onUserSelect,
}: UserListDrawerProp) => {
    const { data: users = [], isLoading, isError } = useAllUsers();
    const { mutate: sendRequest, isPending } = useSendRequest();

    const handleSendRequest = (userId: string) => {
        sendRequest(userId, {
            onSuccess: () => {
                alert("Request sent successfully ✅");
            },
            onError: (err: any) => {
                alert(err.message || "Failed to send request ❌");
            },
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    className="fixed md:absolute top-0 right-0 h-screen w-full md:w-[400px]
             bg-[#11111b] text-white border-l border-[#27272A]
             z-50 flex flex-col shadow-2xl"
                >
                    {/* Overlay only on mobile */}
                    <div
                        className="sm:hidden fixed inset-0 bg-black/40"
                        onClick={onClose}
                    ></div>

                    {/* Drawer content */}
                    <div className="relative flex-1 flex flex-col">
                        {/* Header */}
                        <div className="flex items-center gap-3 p-4 border-b border-[#27272A] bg-[#18181B]/60 backdrop-blur z-10">
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-[#2A2A35] rounded-full transition"
                            >
                                <FiArrowLeft size={20} />
                            </button>
                            <h2 className="text-lg font-semibold text-[#E4E6EB]">
                                Start New Chat
                            </h2>
                        </div>

                        {/* Loading & Error States */}
                        {isLoading && (
                            <p className="text-gray-500 text-center mt-10">
                                Loading users...
                            </p>
                        )}
                        {isError && (
                            <p className="text-red-500 text-center mt-10">
                                Failed to fetch users
                            </p>
                        )}

                        {/* Search Bar */}
                        <div className="px-4 py-3 border-b border-[#27272A]">
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="w-full px-3 py-2 rounded-lg bg-[#1E1E25]
                   text-sm text-[#E4E6EB] placeholder-gray-500
                   focus:outline-none focus:ring-1 focus:ring-[#A2A970]
                   transition"
                            />
                        </div>

                        {/* User List */}
                        {!isLoading && !isError && (
                            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#27272A] scrollbar-track-transparent">
                                {users.map((user: any) => (
                                    <motion.div
                                        key={user.id}
                                        whileHover={{ scale: 1.01 }}
                                        className="flex items-center justify-between p-4 hover:bg-[#1E1E25]
                     cursor-pointer transition-all border-b border-[#18181B]/40"
                                    >
                                        {/* Left section: profile */}
                                        <div
                                            className="flex items-center gap-3"
                                            onClick={() => onUserSelect(user)}
                                        >
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-12 h-12 rounded-full border border-[#27272A]"
                                            />
                                            <div>
                                                <h3 className="font-medium text-[#E4E6EB]">
                                                    {user.name}
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    {user.bio}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Right section: Add button */}
                                        <button
                                            onClick={() =>
                                                handleSendRequest(user.id)
                                            }
                                            className="p-2 bg-[#A2A970] rounded-full hover:bg-[#8fa95a] transition"
                                            disabled={isPending}
                                        >
                                            <FiPlus size={18} />
                                        </button>
                                    </motion.div>
                                ))}

                                {users.length === 0 && (
                                    <p className="text-gray-500 text-center mt-10">
                                        No users found
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
