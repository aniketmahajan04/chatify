import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { SSOCallbackPage } from "./pages/SSOCallbackPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useUserStore } from "./store/userStore";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";

function App() {
    const { setCurrentUser } = useUserStore();
    const { getToken } = useAuth();
    const { isLoaded } = useUser();
    // useEffect(() => {
    //     if (isLoaded && user) {
    //         setCurrentUser({
    //             id: user.id,
    //             name: user.username || user.firstName || "Anonymous",
    //             email: user.emailAddresses[0]?.emailAddress,
    //             avatar: user.imageUrl,
    //         });
    //     }
    // }, [isLoaded, user]);

    // Fetching user from backend
    const { data } = useQuery({
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
    // if (isLoading) return <div>Loading...</div>;
    // if (isError) return <div>Error loading user</div>;

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/register" element={<SignupPage />}></Route>
                    <Route
                        path="/sso-callback"
                        element={<SSOCallbackPage />}
                    ></Route>
                    <Route
                        path="/chat"
                        element={
                            <>
                                <ProtectedRoute>
                                    <ChatPage />
                                </ProtectedRoute>
                            </>
                        }
                    ></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
