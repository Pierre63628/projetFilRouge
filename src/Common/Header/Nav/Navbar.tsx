import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../contexts/AuthContext.tsx";

function Navigation(){
    const redirect = useNavigate();
    const { isAuthenticated, employee, logout } = useAuth();

    const handleLogout = () => {
        logout();
        redirect("/");
    };

    return(
        <nav>
            <ul id="navLinks">
                <button onClick={() => redirect("/")}>Accueil</button>
                <button onClick={() => redirect("/sessions")}>Sessions</button>
                <button onClick={() => redirect("/booking")}>Réserver</button>
                {isAuthenticated ? (
                    <>
                        <button onClick={() => redirect("/employee-dashboard")}>
                            Dashboard ({employee?.name})
                        </button>
                        <button onClick={handleLogout}>Déconnexion</button>
                    </>
                ) : (
                    <button onClick={() => redirect("/login")}>Employé</button>
                )}
            </ul>
        </nav>
    )
};

export default Navigation;