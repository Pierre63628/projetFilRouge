import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

function Common() {
    return (
        <div>
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Common;