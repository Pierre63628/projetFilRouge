import { BrowserRouter, Route, Routes } from "react-router-dom";
import Common from "./Common/Common";
import Homepage from "./Homepage/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Common>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </Common>
    </BrowserRouter>
  );
}

export default App;