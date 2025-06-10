import { BrowserRouter, Route, Routes } from "react-router-dom";
import Common from "./Common/Common";
import Homepage from "./Homepage/Homepage";

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