import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="mt-3">
      <div className="d-flex justify-content-center gap-3 flex-wrap">
        <button className="nav-button px-4" onClick={() => navigate("/reservations")}>
          Reservations
        </button>
        <button className="nav-button px-4" onClick={() => navigate("/sessions")}>
          About sessions
        </button>
        <button className="nav-button px-4" onClick={() => navigate("/contactform")}>
          Contact us
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
