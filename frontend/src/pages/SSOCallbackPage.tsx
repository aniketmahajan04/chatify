import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export const SSOCallbackPage = () => {
  const { isSignedIn, getToken, isLoaded, userId } = useAuth();
  const navigate = useNavigate();
  const [syncAttempted, setSyncAttempted] = useState(false);

  useEffect(() => {
    const handleSSOCallback = async () => {
      console.log(
        "SSO Callback - isLoaded:",
        isLoaded,
        "isSignedIn:",
        isSignedIn,
        "userId:",
        userId
      );

      if (!isLoaded) {
        console.log("Clerk not loaded yet, waiting...");
        return;
      }

      if (!isSignedIn || !userId) {
        console.log("Not signed in or no userId yet, waiting...");
        return;
      }

      if (syncAttempted) {
        console.log("Sync already attempted, skipping...");
        return;
      }

      console.log("User is signed in, syncing to database...");
      setSyncAttempted(true);

      try {
        const token = await getToken();
        console.log("Token received, calling backend...");

        const response = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Backend response status:", response.status);

        if (response.ok) {
          const data = await response.json();
          console.log("User synced to database successfully!", data);
          navigate("/chat");
        } else {
          const errorData = await response.json();
          console.error("Failed to sync user to database:", errorData);
          // Still navigate to chat even if sync fails
          navigate("/chat");
        }
      } catch (error) {
        console.error("Error syncing user:", error);
        // Still navigate to chat even if sync fails
        navigate("/chat");
      }
    };

    handleSSOCallback();
  }, [isLoaded, isSignedIn, userId, getToken, navigate, syncAttempted]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F11] text-white">
      {/* This component is CRITICAL - it completes the OAuth flow */}
      <AuthenticateWithRedirectCallback />

      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A2A970] mx-auto mb-4"></div>
        <p className="text-gray-400">Completing sign-in...</p>
      </div>
    </div>
  );
};
