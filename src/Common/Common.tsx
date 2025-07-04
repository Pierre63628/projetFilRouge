import type { ReactNode } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

function Common({children}: {children: ReactNode}) {
    return (
        <div>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default Common;