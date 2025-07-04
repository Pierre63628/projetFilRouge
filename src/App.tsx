import { BrowserRouter, Route, Routes } from "react-router-dom";
import Common from "./Common/Common.tsx";
import Homepage from "./Homepage/Homepage.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Common />}>
                    <Route path="/" element={<Homepage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;