import { useNavigate } from "react-router-dom"

function Navigation(){
    const redirect = useNavigate();
    return(
        <nav>
            <ul>
                <button onClick={() => redirect("/reservations")}>Reservations</button>
                <button onClick={() => redirect("/sessions")}>About sessions</button>
                <button onClick={() => redirect("/contactform")}>Contact us</button>
            </ul>

        </nav>
    )
};

export default Navigation;