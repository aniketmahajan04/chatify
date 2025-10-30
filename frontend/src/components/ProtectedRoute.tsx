import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: any }) {
    const { isLoaded, isSignedIn } = useUser();
    const { setCurrentUser } = useUserStore();
    const { getToken } = useAuth();

    // Wait until Clerk finishes loading user state
    if (!isLoaded) return null;

    // If not signed in, redirect to your own login page
    if (!isSignedIn) {
        return <Navigate to="/login" replace />;
    }

    // Fetching user from backend
    const { data, isLoading, isError } = useQuery({
        queryKey: ["currentUser"],
        enabled: isLoaded,
        queryFn: async () => {
            const token = await getToken();
            const res = await fetch("http://localhost:3000/me", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include", // send cookies/token
            });
            if (!res.ok) throw new Error("Failed to fetch user");
            return res.json();
        },
    });
    useEffect(() => {
        if (data)
            setCurrentUser({
                id: data.id,
                name: data.name,
                email: data.email,
            });
    }, [data]);
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading user</div>;

    // If signed in, render children (protected content)
    return <>{children}</>;
}
