import React from 'react';
import { useSession } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";
import SessionCard from "../components/Sessions/SessionCard";
import "./Homepage.css";

function Homepage() {
  const { sessions } = useSession();
  const navigate = useNavigate();

  // Show only first 3 sessions on homepage
  const featuredSessions = sessions.slice(0, 3);

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>🏚️ Bienvenue chez La Maison Horrifique</h1>
        <p>
          Plongez dans l'aventure : découvrez nos sessions d'escape game immersives et vivez une expérience unique en équipe !
        </p>
        <div className="homepage-actions">
          <button 
            className="homepage-btn primary"
            onClick={() => navigate('/sessions')}
          >
            🎫 Découvrir toutes les sessions
          </button>
          <button 
            className="homepage-btn secondary"
            onClick={() => navigate('/booking')}
          >
            📅 Réserver maintenant
          </button>
        </div>
      </header>

      <section className="homepage-section" id="sessions">
        <h2>Nos Sessions Phares</h2>
        <p className="section-description">
          Découvrez un aperçu de nos expériences les plus populaires
        </p>
        
        <div className="featured-sessions">
          {featuredSessions.map(session => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>

        <div className="view-all-sessions">
          <button 
            className="view-all-btn"
            onClick={() => navigate('/sessions')}
          >
            Voir toutes nos sessions ({sessions.length})
          </button>
        </div>
      </section>

      <section className="homepage-section about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>À propos de La Maison Horrifique</h2>
            <p>
              La Maison Horrifique est une entreprise passionnée par le jeu et l'aventure, spécialisée dans la création de sessions d'escape game originales pour tous les âges. Notre équipe imagine des scénarios immersifs pour vous faire vivre des moments inoubliables entre amis, en famille ou entre collègues.
            </p>
            <div className="features">
              <div className="feature">
                <span className="feature-icon">🎭</span>
                <div className="feature-content">
                  <h4>Expériences Immersives</h4>
                  <p>Des scénarios captivants et des décors soignés</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">👥</span>
                <div className="feature-content">
                  <h4>Pour Tous</h4>
                  <p>Adaptés à tous les niveaux et groupes</p>
                </div>
              </div>
              <div className="feature">
                <span className="feature-icon">🏆</span>
                <div className="feature-content">
                  <h4>Qualité Premium</h4>
                  <p>Équipements modernes et service professionnel</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-stats">
            <div className="stat">
              <div className="stat-number">{sessions.length}</div>
              <div className="stat-label">Sessions Disponibles</div>
            </div>
            <div className="stat">
              <div className="stat-number">1000+</div>
              <div className="stat-label">Joueurs Satisfaits</div>
            </div>
            <div className="stat">
              <div className="stat-number">95%</div>
              <div className="stat-label">Taux de Réussite</div>
            </div>
          </div>
        </div>
      </section>

      <section className="homepage-section contact-section">
        <h2>Contact & Informations</h2>
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <div>
                <strong>Email :</strong>
                <p>contact@lamaisonhorrifique.fr</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <div>
                <strong>Téléphone :</strong>
                <p>01 23 45 67 89</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <div>
                <strong>Adresse :</strong>
                <p>42 rue de l'Aventure, 75000 Paris</p>
              </div>
            </div>
          </div>
          <div className="contact-hours">
            <h4>Horaires d'ouverture</h4>
            <div className="hours-list">
              <div className="hours-item">
                <span>Lundi - Vendredi</span>
                <span>14h - 22h</span>
              </div>
              <div className="hours-item">
                <span>Samedi - Dimanche</span>
                <span>10h - 24h</span>
              </div>
              <div className="hours-item">
                <span>Jours fériés</span>
                <span>Sur réservation</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
