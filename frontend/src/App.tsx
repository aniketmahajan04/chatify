import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<ChatPage />}></Route>
                    <Route path="/home" element={<HomePage />}></Route>
                    <Route path="/login" element={<LoginPage />}></Route>
                    <Route path="/register" element={<SignupPage />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
