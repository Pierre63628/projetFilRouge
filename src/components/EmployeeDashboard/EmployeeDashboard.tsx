import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSession } from '../../contexts/SessionContext';
import { Navigate } from 'react-router-dom';
import SessionManagement from '../SessionManagement/SessionManagement';
import BookingManagement from '../BookingManagement/BookingManagement';
import './EmployeeDashboard.css';

type DashboardTab = 'overview' | 'sessions' | 'bookings';

const EmployeeDashboard: React.FC = () => {
  const { isAuthenticated, employee } = useAuth();
  const { sessions, bookings } = useSession();
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const activeBookings = bookings.filter(booking => booking.status === 'confirmed');
  const totalRevenue = activeBookings.reduce((sum, booking) => {
    const session = sessions.find(s => s.id === booking.sessionId);
    return sum + (session ? session.price * booking.participantCount : 0);
  }, 0);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="dashboard-overview">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Sessions Actives</h3>
                <div className="stat-number">{sessions.length}</div>
                <div className="stat-description">Sessions d'escape game</div>
              </div>
              
              <div className="stat-card">
                <h3>Réservations</h3>
                <div className="stat-number">{activeBookings.length}</div>
                <div className="stat-description">Réservations confirmées</div>
              </div>
              
              <div className="stat-card">
                <h3>Revenus</h3>
                <div className="stat-number">{totalRevenue}€</div>
                <div className="stat-description">Revenus totaux</div>
              </div>
              
              <div className="stat-card">
                <h3>Taux d'occupation</h3>
                <div className="stat-number">
                  {sessions.length > 0 ? Math.round((activeBookings.length / (sessions.length * 10)) * 100) : 0}%
                </div>
                <div className="stat-description">Moyenne estimée</div>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Activité Récente</h3>
              <div className="activity-list">
                {activeBookings.slice(0, 5).map(booking => {
                  const session = sessions.find(s => s.id === booking.sessionId);
                  return (
                    <div key={booking.id} className="activity-item">
                      <div className="activity-icon">📅</div>
                      <div className="activity-content">
                        <div className="activity-title">
                          Nouvelle réservation pour "{session?.name}"
                        </div>
                        <div className="activity-meta">
                          {booking.participantCount} participant(s) - {booking.customerEmail}
                        </div>
                      </div>
                      <div className="activity-time">
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </div>
                    </div>
                  );
                })}
                {activeBookings.length === 0 && (
                  <div className="no-activity">Aucune activité récente</div>
                )}
              </div>
            </div>
          </div>
        );
      
      case 'sessions':
        return <SessionManagement />;
      
      case 'bookings':
        return <BookingManagement />;
      
      default:
        return null;
    }
  };

  return (
    <div className="employee-dashboard">
      <div className="dashboard-header">
        <h1>🏚️ Dashboard Employé</h1>
        <p>Bienvenue, {employee?.name} ({employee?.role})</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Vue d'ensemble
        </button>
        <button 
          className={`tab-button ${activeTab === 'sessions' ? 'active' : ''}`}
          onClick={() => setActiveTab('sessions')}
        >
          Gestion des Sessions
        </button>
        <button 
          className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          Gestion des Réservations
        </button>
      </div>

      <div className="dashboard-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
