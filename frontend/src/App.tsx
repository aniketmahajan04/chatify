import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { SSOCallbackPage } from "./pages/SSOCallbackPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
// import { useUserStore } from "./store/userStore";
// import { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useAuth, useUser } from "@clerk/clerk-react";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<SignupPage />}></Route>
          <Route path="/sso-callback" element={<SSOCallbackPage />}></Route>
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
