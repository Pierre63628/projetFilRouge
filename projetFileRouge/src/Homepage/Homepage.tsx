import React from "react";
import "./Homepage.css";

function Homepage() {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Bienvenue chez EscapeXperience</h1>
        <p>
          Plongez dans l’aventure : découvrez nos sessions d’escape game immersives et vivez une expérience unique en équipe !
        </p>
        <a href="#sessions" className="homepage-btn">
          Découvrir les sessions
        </a>
      </header>

      <section className="homepage-section" id="sessions">
        <h2>Nos sessions d’escape game</h2>
        <div className="features">
          <div className="feature-card">
            <h3>Le Mystère du Manoir</h3>
            <p>Enquêtez dans un vieux manoir hanté et résolvez ses énigmes avant la fin du temps imparti.</p>
          </div>
          <div className="feature-card">
            <h3>Évasion du Laboratoire</h3>
            <p>Collaborez pour sortir d’un laboratoire secret rempli de pièges et de codes à décrypter.</p>
          </div>
          <div className="feature-card">
            <h3>Le Trésor des Pirates</h3>
            <p>Partez à la chasse au trésor sur une île mystérieuse et déjouez les pièges des pirates.</p>
          </div>
        </div>
      </section>

      <section className="homepage-section">
        <h2>À propos de EscapeXperience</h2>
        <p>
          EscapeXperience est une entreprise passionnée par le jeu et l’aventure, spécialisée dans la création de sessions d’escape game originales pour tous les âges. Notre équipe imagine des scénarios immersifs pour vous faire vivre des moments inoubliables entre amis, en famille ou entre collègues.
        </p>
      </section>

      <section className="homepage-section">
        <h2>Contact</h2>
        <p>
          Une question ? Envie de réserver ? Contactez-nous !
        </p>
        <ul style={{ listStyle: "none", padding: 0, lineHeight: "2" }}>
          <li><strong>Email :</strong> contact@escapexperience.fr</li>
          <li><strong>Téléphone :</strong> 01 23 45 67 89</li>
          <li><strong>Adresse :</strong> 42 rue de l’Aventure, 75000 Paris</li>
        </ul>
      </section>
    </div>
  );
}

export default Homepage;