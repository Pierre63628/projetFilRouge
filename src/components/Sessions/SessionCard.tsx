import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Session } from '../../contexts/SessionContext.tsx';
import './SessionCard.css';

interface SessionCardProps {
  session: Session;
}

const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking?sessionId=${session.id}`);
  };

  const availableSlots = session.availableSlots.filter(slot => !slot.isBooked);
  const isBookable = availableSlots.length > 0;

  return (
    <div className="session-card">
      <div className="session-card-image">
        <img 
          src={session.image} 
          alt={session.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-horror.jpg';
          }}
        />
        <div className="session-card-badges">
          <span className={`difficulty-badge ${session.difficulty.toLowerCase()}`}>
            {session.difficulty}
          </span>
          {!isBookable && (
            <span className="availability-badge unavailable">
              Complet
            </span>
          )}
        </div>
      </div>

      <div className="session-card-content">
        <div className="session-card-header">
          <h3 className="session-name">{session.name}</h3>
          <div className="session-price">{session.price}€<span>/pers.</span></div>
        </div>

        <div className="session-theme">{session.theme}</div>

        <div className="session-details">
          <div className="detail-row">
            <div className="detail-item">
              <span className="detail-icon">⏱️</span>
              <span className="detail-text">{session.duration} min</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">👥</span>
              <span className="detail-text">{session.minParticipants}-{session.maxParticipants} pers.</span>
            </div>
          </div>
          <div className="detail-row">
            <div className="detail-item">
              <span className="detail-icon">📅</span>
              <span className="detail-text">{availableSlots.length} créneaux</span>
            </div>
            <div className="detail-item">
              <span className="detail-icon">🎯</span>
              <span className="detail-text">{session.difficulty}</span>
            </div>
          </div>
        </div>

        <div className="session-description">
          <p>{session.description.length > 120 
            ? `${session.description.substring(0, 120)}...` 
            : session.description}
          </p>
        </div>

        <div className="session-card-actions">
          <button 
            className={`book-button ${!isBookable ? 'disabled' : ''}`}
            onClick={handleBooking}
            disabled={!isBookable}
          >
            {isBookable ? '🎫 Réserver' : '❌ Complet'}
          </button>
          
          <button 
            className="details-button"
            onClick={() => {
              // Could navigate to a detailed view or show a modal
              alert(`Détails de "${session.name}":\n\n${session.description}`);
            }}
          >
            ℹ️ Détails
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
