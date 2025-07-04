import { BrowserRouter, Route, Routes } from "react-router-dom";
import Common from "./Common/Common.tsx";
import Homepage from "./Homepage/Homepage.tsx";

function App() {
    const basename = import.meta.env.PROD ? '/ProjetReac' : '';

    return (
        <BrowserRouter basename={basename}>
            <Routes>
                <Route element={<Common />}>
                    <Route path="/" element={<Homepage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;