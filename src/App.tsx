import { BrowserRouter, Route, Routes } from "react-router-dom";
import Common from "./Common/Common";
import Homepage from "./Homepage/Homepage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Common>
                    <Route path="/" element={<Homepage />} />
                </Common>
            </Routes>
        </BrowserRouter>
    );
}

export default App;