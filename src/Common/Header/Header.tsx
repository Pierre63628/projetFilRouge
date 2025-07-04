import Navbar from "./Nav/Navbar";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="container text-center py-4">
                <h1 className="display-5 fw-bold">La Maison Horrifique</h1>
                <Navbar />
            </div>
        </header>
    );
}

export default Header;
