import {HashRouter, Route, Routes} from "react-router-dom";
import Common from "./Common/Common.tsx";
import Homepage from "./Homepage/Homepage.tsx";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route element={<Common />}>
                    <Route path="/" element={<Homepage />} />
                </Route>
            </Routes>
        </HashRouter>
    );
}

export default App;