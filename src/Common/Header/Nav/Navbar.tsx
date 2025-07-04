import { useNavigate } from "react-router-dom"

function Navigation(){
    const redirect = useNavigate();
    return(
        <nav>
            <ul id="navLinks">
                <button onClick={() => redirect("/reservations")}>Reservations</button>
                <button id="middleButton" onClick={() => redirect("/sessions")}>About sessions</button>
                <button onClick={() => redirect("/contactform")}>Contact us</button>
            </ul>

        </nav>
    )
};

export default Navigation;