import React, { useState } from 'react';
import { useSession, Booking } from '../../contexts/SessionContext.tsx';
import './BookingManagement.css';

const BookingManagement: React.FC = () => {
  const { sessions, bookings, cancelBooking } = useSession();
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = bookings.filter(booking => {
    const matchesFilter = filter === 'all' || booking.status === filter;
    const matchesSearch = booking.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sessions.find(s => s.id === booking.sessionId)?.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleCancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    const session = sessions.find(s => s.id === booking?.sessionId);
    
    if (window.confirm(`Êtes-vous sûr de vouloir annuler cette réservation pour "${session?.name}" ?`)) {
      cancelBooking(bookingId);
    }
  };

  const getSessionName = (sessionId: string) => {
    return sessions.find(s => s.id === sessionId)?.name || 'Session inconnue';
  };

  const getTimeSlotInfo = (booking: Booking) => {
    const session = sessions.find(s => s.id === booking.sessionId);
    const timeSlot = session?.availableSlots.find(slot => slot.id === booking.timeSlotId);
    return timeSlot ? new Date(timeSlot.dateTime).toLocaleString('fr-FR') : 'Créneau inconnu';
  };

  const getTotalRevenue = () => {
    return filteredBookings
      .filter(booking => booking.status === 'confirmed')
      .reduce((sum, booking) => {
        const session = sessions.find(s => s.id === booking.sessionId);
        return sum + (session ? session.price * booking.participantCount : 0);
      }, 0);
  };

  return (
    <div className="booking-management">
      <div className="booking-management-header">
        <h2>Gestion des Réservations</h2>
        <div className="booking-stats">
          <div className="stat">
            <span className="stat-label">Total:</span>
            <span className="stat-value">{filteredBookings.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Revenus:</span>
            <span className="stat-value">{getTotalRevenue()}€</span>
          </div>
        </div>
      </div>

      <div className="booking-filters">
        <div className="filter-group">
          <label htmlFor="status-filter">Statut:</label>
          <select
            id="status-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'confirmed' | 'cancelled')}
          >
            <option value="all">Toutes</option>
            <option value="confirmed">Confirmées</option>
            <option value="cancelled">Annulées</option>
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="search">Rechercher:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Email, nom, session..."
          />
        </div>
      </div>

      <div className="bookings-table-container">
        {filteredBookings.length > 0 ? (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Session</th>
                <th>Client</th>
                <th>Participants</th>
                <th>Date/Heure</th>
                <th>Réservé le</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map(booking => (
                <tr key={booking.id} className={`booking-row ${booking.status}`}>
                  <td className="session-cell">
                    <div className="session-name">{getSessionName(booking.sessionId)}</div>
                    <div className="session-price">
                      {sessions.find(s => s.id === booking.sessionId)?.price}€/pers.
                    </div>
                  </td>
                  
                  <td className="customer-cell">
                    <div className="customer-email">{booking.customerEmail}</div>
                    {booking.customerName && (
                      <div className="customer-name">{booking.customerName}</div>
                    )}
                    {booking.customerPhone && (
                      <div className="customer-phone">{booking.customerPhone}</div>
                    )}
                  </td>
                  
                  <td className="participants-cell">
                    <span className="participant-count">{booking.participantCount}</span>
                    <div className="total-price">
                      Total: {(sessions.find(s => s.id === booking.sessionId)?.price || 0) * booking.participantCount}€
                    </div>
                  </td>
                  
                  <td className="datetime-cell">
                    {getTimeSlotInfo(booking)}
                  </td>
                  
                  <td className="booking-date-cell">
                    {new Date(booking.bookingDate).toLocaleDateString('fr-FR')}
                  </td>
                  
                  <td className="status-cell">
                    <span className={`status-badge ${booking.status}`}>
                      {booking.status === 'confirmed' ? 'Confirmée' : 'Annulée'}
                    </span>
                  </td>
                  
                  <td className="actions-cell">
                    {booking.status === 'confirmed' && (
                      <button
                        className="cancel-booking-btn"
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Annuler
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-bookings">
            <div className="no-bookings-icon">📅</div>
            <h3>Aucune réservation</h3>
            <p>
              {searchTerm || filter !== 'all' 
                ? 'Aucune réservation ne correspond à vos critères de recherche.'
                : 'Aucune réservation n\'a encore été effectuée.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingManagement;
