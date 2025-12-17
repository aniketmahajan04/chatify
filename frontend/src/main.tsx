import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { SocketProvider } from "./components/SocketContext.tsx";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    throw "Missing Publishable Key";
}
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <QueryClientProvider client={queryClient}>
                <SocketProvider>
                    <App />
                </SocketProvider>
            </QueryClientProvider>
        </ClerkProvider>
    </StrictMode>,
);
