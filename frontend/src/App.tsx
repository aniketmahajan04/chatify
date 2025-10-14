import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChatPage } from "./pages/ChatPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChatPage />}></Route>
          {/* <Route path="/" element={<HomePage />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
