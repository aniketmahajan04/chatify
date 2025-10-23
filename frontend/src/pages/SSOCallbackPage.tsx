import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export const SSOCallbackPage = () => {
  const { isSignedIn, getToken, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleSSOCallback = async () => {
      console.log(
        "SSO Callback - isLoaded:",
        isLoaded,
        "isSignedIn:",
        isSignedIn
      );

      if (!isLoaded) {
        console.log("Clerk not loaded yet, waiting...");
        return;
      }

      if (isSignedIn) {
        console.log("User is signed in, syncing to database...");

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
            navigate("/");
          }
        } catch (error) {
          console.error("Error syncing user:", error);
          navigate("/");
        }
      } else {
        console.log("User not signed in, redirecting to home");
        navigate("/");
      }
    };

    handleSSOCallback();
  }, [isLoaded, isSignedIn, getToken, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F0F11] text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A2A970] mx-auto mb-4"></div>
        <p className="text-gray-400">Completing sign-in...</p>
      </div>
    </div>
  );
};
