import { BrowserRouter, Route, Routes } from "react-router-dom";
import Common from "./Common/Common";
import Homepage from "./Homepage/Homepage";
import Login from "./pages/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Common>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Common>
    </BrowserRouter>
  );
}

export default App;