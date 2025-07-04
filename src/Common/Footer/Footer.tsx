import Socials from "./Socials/Socials.tsx";
import Links from "./Links/Links.tsx";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer mt-5">
      <div className="container py-4">
        <div className="footer-content d-flex flex-column flex-md-row justify-content-center align-items-start gap-5">
          <Socials />
          <Links />
        </div>
        <div className="footer-copyright text-center small mt-4">
          © {new Date().getFullYear()} Projet Fil Rouge. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
