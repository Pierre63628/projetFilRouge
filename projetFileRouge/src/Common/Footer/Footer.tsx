import Socials from "./Socials/Socials";
import Links from "./Links/Links";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-socials">
          <Socials />
        </div>
        <div className="footer-links">
          <Links />
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Projet Fil Rouge. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;