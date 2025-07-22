import React, { useState, useEffect } from 'react';
import { useSession } from '../../contexts/SessionContext.tsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './BookingForm.css';

const BookingForm: React.FC = () => {
  const { sessions, addBooking, getAvailableSlots } = useSession();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [selectedSessionId, setSelectedSessionId] = useState<string>('');
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [participantCount, setParticipantCount] = useState<number>(2);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  const selectedSession = sessions.find(s => s.id === selectedSessionId);
  const availableSlots = selectedSessionId ? getAvailableSlots(selectedSessionId) : [];

  useEffect(() => {
    const sessionIdFromUrl = searchParams.get('sessionId');
    if (sessionIdFromUrl && sessions.find(s => s.id === sessionIdFromUrl)) {
      setSelectedSessionId(sessionIdFromUrl);
    }
  }, [searchParams, sessions]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!selectedSessionId) newErrors.session = 'Veuillez sélectionner une session';
    if (!selectedTimeSlotId) newErrors.timeSlot = 'Veuillez sélectionner un créneau';
    if (!customerEmail.trim()) newErrors.email = 'L\'email est requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      newErrors.email = 'Format d\'email invalide';
    }
    if (!customerName.trim()) newErrors.name = 'Le nom est requis';
    
    if (selectedSession) {
      if (participantCount < selectedSession.minParticipants) {
        newErrors.participants = `Minimum ${selectedSession.minParticipants} participants requis`;
      }
      if (participantCount > selectedSession.maxParticipants) {
        newErrors.participants = `Maximum ${selectedSession.maxParticipants} participants autorisés`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      const success = await addBooking({
        sessionId: selectedSessionId,
        timeSlotId: selectedTimeSlotId,
        customerEmail: customerEmail.trim(),
        participantCount,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim() || undefined,
        status: 'confirmed'
      });

      if (success) {
        setShowSuccess(true);

        // Reset form after successful booking
        setTimeout(() => {
          setShowSuccess(false);
          navigate('/sessions');
        }, 3000);
      } else {
        setErrors({ submit: 'Erreur lors de la création de la réservation' });
      }

    } catch (error) {
      console.error('Error creating booking:', error);
      setErrors({ submit: 'Une erreur est survenue lors de la réservation' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    switch (field) {
      case 'session':
        setSelectedSessionId(value);
        setSelectedTimeSlotId(''); // Reset time slot when session changes
        break;
      case 'timeSlot':
        setSelectedTimeSlotId(value);
        break;
      case 'email':
        setCustomerEmail(value);
        break;
      case 'name':
        setCustomerName(value);
        break;
      case 'phone':
        setCustomerPhone(value);
        break;
      case 'participants':
        setParticipantCount(parseInt(value) || 1);
        break;
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getTotalPrice = () => {
    return selectedSession ? selectedSession.price * participantCount : 0;
  };

  if (showSuccess) {
    return (
      <div className="booking-success">
        <div className="success-card">
          <div className="success-icon">✅</div>
          <h2>Réservation Confirmée !</h2>
          <p>Votre réservation a été enregistrée avec succès.</p>
          <div className="booking-summary">
            <h3>Récapitulatif :</h3>
            <div className="summary-item">
              <strong>Session :</strong> {selectedSession?.name}
            </div>
            <div className="summary-item">
              <strong>Date :</strong> {availableSlots.find(slot => slot.id === selectedTimeSlotId) 
                ? new Date(availableSlots.find(slot => slot.id === selectedTimeSlotId)!.dateTime).toLocaleString('fr-FR')
                : 'N/A'}
            </div>
            <div className="summary-item">
              <strong>Participants :</strong> {participantCount}
            </div>
            <div className="summary-item">
              <strong>Total :</strong> {getTotalPrice()}€
            </div>
          </div>
          <p className="redirect-info">Redirection vers les sessions dans quelques secondes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-form-container">
      <div className="booking-form-header">
        <h1>🎫 Réserver une Session</h1>
        <p>Réservez votre expérience d'escape game horrifique</p>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-section">
          <h3>Sélection de la Session</h3>
          
          <div className="form-group">
            <label htmlFor="session">Session d'escape game *</label>
            <select
              id="session"
              value={selectedSessionId}
              onChange={(e) => handleInputChange('session', e.target.value)}
              className={errors.session ? 'error' : ''}
            >
              <option value="">Choisissez une session</option>
              {sessions.map(session => (
                <option key={session.id} value={session.id}>
                  {session.name} - {session.price}€/pers. ({session.duration}min)
                </option>
              ))}
            </select>
            {errors.session && <span className="error-text">{errors.session}</span>}
          </div>

          {selectedSession && (
            <div className="session-info">
              <h4>{selectedSession.name}</h4>
              <p><strong>Thème :</strong> {selectedSession.theme}</p>
              <p><strong>Durée :</strong> {selectedSession.duration} minutes</p>
              <p><strong>Participants :</strong> {selectedSession.minParticipants}-{selectedSession.maxParticipants} personnes</p>
              <p><strong>Difficulté :</strong> {selectedSession.difficulty}</p>
              <p className="session-description">{selectedSession.description}</p>
            </div>
          )}

          {selectedSessionId && (
            <div className="form-group">
              <label htmlFor="timeSlot">Créneau horaire *</label>
              <select
                id="timeSlot"
                value={selectedTimeSlotId}
                onChange={(e) => handleInputChange('timeSlot', e.target.value)}
                className={errors.timeSlot ? 'error' : ''}
              >
                <option value="">Choisissez un créneau</option>
                {availableSlots.map(slot => (
                  <option key={slot.id} value={slot.id}>
                    {new Date(slot.dateTime).toLocaleString('fr-FR')} 
                    ({slot.maxCapacity - slot.currentBookings} places disponibles)
                  </option>
                ))}
              </select>
              {errors.timeSlot && <span className="error-text">{errors.timeSlot}</span>}
              {availableSlots.length === 0 && selectedSessionId && (
                <span className="info-text">Aucun créneau disponible pour cette session</span>
              )}
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>Informations Client</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Nom complet *</label>
              <input
                type="text"
                id="name"
                value={customerName}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'error' : ''}
                placeholder="Votre nom complet"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                value={customerEmail}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'error' : ''}
                placeholder="votre@email.com"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Téléphone (optionnel)</label>
              <input
                type="tel"
                id="phone"
                value={customerPhone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="06 12 34 56 78"
              />
            </div>

            <div className="form-group">
              <label htmlFor="participants">Nombre de participants *</label>
              <input
                type="number"
                id="participants"
                value={participantCount}
                onChange={(e) => handleInputChange('participants', e.target.value)}
                className={errors.participants ? 'error' : ''}
                min={selectedSession?.minParticipants || 1}
                max={selectedSession?.maxParticipants || 10}
              />
              {errors.participants && <span className="error-text">{errors.participants}</span>}
              {selectedSession && (
                <span className="info-text">
                  Entre {selectedSession.minParticipants} et {selectedSession.maxParticipants} participants
                </span>
              )}
            </div>
          </div>
        </div>

        {selectedSession && participantCount > 0 && (
          <div className="booking-summary">
            <h3>Récapitulatif</h3>
            <div className="summary-row">
              <span>Session : {selectedSession.name}</span>
              <span>{selectedSession.price}€ × {participantCount}</span>
            </div>
            <div className="summary-total">
              <span>Total à payer :</span>
              <span>{getTotalPrice()}€</span>
            </div>
          </div>
        )}

        {errors.submit && (
          <div className="error-message">{errors.submit}</div>
        )}

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/sessions')}
            className="cancel-btn"
          >
            Retour aux sessions
          </button>
          <button 
            type="submit" 
            disabled={isSubmitting || !selectedSessionId || !selectedTimeSlotId}
            className="submit-btn"
          >
            {isSubmitting ? 'Réservation...' : `Réserver (${getTotalPrice()}€)`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
