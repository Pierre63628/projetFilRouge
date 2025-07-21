import Navbar from "./Nav/Navbar.tsx"
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle.tsx";
import "./Header.css";

function Header(){
    return(
        <div id="Header">
            <h1>La Maison Horrifique</h1>
            <div className="header-controls">
                <Navbar />
                <ThemeToggle />
            </div>
        </div>
    )
}

export default Header;