import { useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: any }) {
    const { isLoaded, isSignedIn } = useUser();

    // Wait until Clerk finishes loading user state
    if (!isLoaded) return null;

    // If not signed in, redirect to your own login page
    if (!isSignedIn) {
        return <Navigate to="/login" replace />;
    }

    // If signed in, render children (protected content)
    return <>{children}</>;
}
