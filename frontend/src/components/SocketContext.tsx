import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useMemo,
    useRef,
} from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "@clerk/clerk-react";

// Shape of the context value
interface SocketContextType {
    socket: Socket | null;
    isConnected: boolean;
}

// Set up the context with default value
const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

// The provider component
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const { getToken, userId } = useAuth();
    const socketRef = useRef<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Prevent connection if the user is not logged in
        if (!userId) return;

        let isMounted = true;

        const connectSocket = async () => {
            const token = await getToken();

            if (!token || !isMounted) return;

            // Prevent duplicate connections
            if (socketRef.current) return;

            const newSocket = io(
                import.meta.env.VITE_BACKEND_URL || "http://localhost:3000",
                {
                    transports: ["websocket"],
                    auth: {
                        token: token,
                    },
                    autoConnect: true,
                },
            );

            newSocket.on("connect", () => {
                console.log("Socket connected:", newSocket.id);
                setIsConnected(true);
            });

            newSocket.on("disconnect", () => {
                console.log("Socket disconnected");
                setIsConnected(false);
            });

            newSocket.on("connect_error", (err) => {
                console.error("Socket connection error:", err.message);
            });

            newSocket.on("connected", (data) => {
                console.log("Server welcome:", data.message);
            });

            socketRef.current = newSocket;
        };

        connectSocket();

        // Cleanup function
        return () => {
            isMounted = false;

            if (socketRef) {
                socketRef.current?.off(); // Remove all listeners
                socketRef.current?.disconnect();
                socketRef.current = null;
            }
        };
    }, [userId, getToken]);

    const contextValue = useMemo(
        () => ({
            socket: socketRef.current,
            isConnected,
        }),
        [isConnected],
    );

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};
