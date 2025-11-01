import { useAuth, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function ProtectedRoute({ children }: { children: any }) {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
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
    enabled: isLoaded && isSignedIn,
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
    if (data && data.success && data.user) {
      setCurrentUser({
        id: data.user.id,
        name: data.user.name || "",
        email: data.user.email || "",
        avatar: clerkUser?.imageUrl || data.user.avatar || "",
        bio: data.user.bio || "",
      });
    }
  }, [data, clerkUser, setCurrentUser]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading user</div>;

  // If signed in, render children (protected content)
  return <>{children}</>;
}
