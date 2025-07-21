import React, { useState } from 'react';
import { useSession, Session } from '../../contexts/SessionContext.tsx';
import SessionForm from './SessionForm';
import './SessionManagement.css';

const SessionManagement: React.FC = () => {
  const { sessions, deleteSession } = useSession();
  const [showForm, setShowForm] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);

  const handleEdit = (session: Session) => {
    setEditingSession(session);
    setShowForm(true);
  };

  const handleDelete = (sessionId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette session ? Cette action est irréversible.')) {
      deleteSession(sessionId);
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingSession(null);
  };

  const handleAddNew = () => {
    setEditingSession(null);
    setShowForm(true);
  };

  if (showForm) {
    return (
      <SessionForm 
        session={editingSession}
        onClose={handleCloseForm}
      />
    );
  }

  return (
    <div className="session-management">
      <div className="session-management-header">
        <h2>Gestion des Sessions</h2>
        <button 
          className="add-session-btn"
          onClick={handleAddNew}
        >
          ➕ Nouvelle Session
        </button>
      </div>

      <div className="sessions-grid">
        {sessions.map(session => (
          <div key={session.id} className="session-card">
            <div className="session-image">
              <img 
                src={session.image} 
                alt={session.name}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-horror.jpg';
                }}
              />
              <div className="session-difficulty">{session.difficulty}</div>
            </div>
            
            <div className="session-info">
              <h3>{session.name}</h3>
              <div className="session-details">
                <div className="detail-item">
                  <span className="detail-label">Thème:</span>
                  <span className="detail-value">{session.theme}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Durée:</span>
                  <span className="detail-value">{session.duration} min</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Prix:</span>
                  <span className="detail-value">{session.price}€</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Participants:</span>
                  <span className="detail-value">{session.minParticipants}-{session.maxParticipants}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Créneaux:</span>
                  <span className="detail-value">{session.availableSlots.length}</span>
                </div>
              </div>
              
              <div className="session-description">
                <p>{session.description.substring(0, 150)}...</p>
              </div>
            </div>
            
            <div className="session-actions">
              <button 
                className="edit-btn"
                onClick={() => handleEdit(session)}
              >
                ✏️ Modifier
              </button>
              <button 
                className="delete-btn"
                onClick={() => handleDelete(session.id)}
              >
                🗑️ Supprimer
              </button>
            </div>
          </div>
        ))}
        
        {sessions.length === 0 && (
          <div className="no-sessions">
            <div className="no-sessions-icon">🏚️</div>
            <h3>Aucune session</h3>
            <p>Commencez par créer votre première session d'escape game.</p>
            <button 
              className="add-first-session-btn"
              onClick={handleAddNew}
            >
              Créer une session
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionManagement;
