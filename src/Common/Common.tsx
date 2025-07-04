import Footer from "./Footer/Footer.tsx";
import Header from "./Header/Header.tsx";
import { Outlet } from "react-router-dom";

function Common() {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Common;