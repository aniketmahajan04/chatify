import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { SSOCallbackPage } from "./pages/SSOCallbackPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useUser } from "@clerk/clerk-react";
import { useUserStore } from "./store/userStore";
import { useEffect } from "react";

function App() {
    const { isLoaded, user } = useUser();
    const { setCurrentUser } = useUserStore();

    useEffect(() => {
        if (isLoaded && user) {
            setCurrentUser({
                id: user.id,
                name: user.username || user.firstName || "Anonymous",
                email: user.emailAddresses[0]?.emailAddress,
                avatar: user.imageUrl,
            });
        }
    }, [isLoaded, user]);

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
