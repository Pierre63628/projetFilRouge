import React, { useState, useEffect } from 'react';
import { useSession, Session, TimeSlot } from '../../contexts/SessionContext.tsx';
import './SessionForm.css';

interface SessionFormProps {
  session?: Session | null;
  onClose: () => void;
}

const SessionForm: React.FC<SessionFormProps> = ({ session, onClose }) => {
  const { addSession, updateSession } = useSession();
  const [formData, setFormData] = useState({
    name: '',
    theme: '',
    duration: 60,
    price: 30,
    minParticipants: 2,
    maxParticipants: 6,
    description: '',
    image: '',
    difficulty: 'Intermédiaire' as 'Facile' | 'Intermédiaire' | 'Difficile',
  });
  const [timeSlots, setTimeSlots] = useState<Omit<TimeSlot, 'id' | 'sessionId'>[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session) {
      setFormData({
        name: session.name,
        theme: session.theme,
        duration: session.duration,
        price: session.price,
        minParticipants: session.minParticipants,
        maxParticipants: session.maxParticipants,
        description: session.description,
        image: session.image,
        difficulty: session.difficulty,
      });
      setTimeSlots(session.availableSlots.map(slot => ({
        dateTime: slot.dateTime,
        isBooked: slot.isBooked,
        maxCapacity: slot.maxCapacity,
        currentBookings: slot.currentBookings,
      })));
    }
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'price' || name === 'minParticipants' || name === 'maxParticipants'
        ? parseInt(value) || 0
        : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addTimeSlot = () => {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const timeString = tomorrow.toISOString().slice(0, 16);
    
    setTimeSlots(prev => [...prev, {
      dateTime: timeString,
      isBooked: false,
      maxCapacity: formData.maxParticipants,
      currentBookings: 0,
    }]);
  };

  const updateTimeSlot = (index: number, field: keyof Omit<TimeSlot, 'id' | 'sessionId'>, value: any) => {
    setTimeSlots(prev => prev.map((slot, i) => 
      i === index ? { ...slot, [field]: value } : slot
    ));
  };

  const removeTimeSlot = (index: number) => {
    setTimeSlots(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Le nom est requis';
    if (!formData.theme.trim()) newErrors.theme = 'Le thème est requis';
    if (formData.duration < 30) newErrors.duration = 'La durée doit être d\'au moins 30 minutes';
    if (formData.price < 10) newErrors.price = 'Le prix doit être d\'au moins 10€';
    if (formData.minParticipants < 1) newErrors.minParticipants = 'Minimum 1 participant';
    if (formData.maxParticipants < formData.minParticipants) {
      newErrors.maxParticipants = 'Le maximum doit être supérieur au minimum';
    }
    if (!formData.description.trim()) newErrors.description = 'La description est requise';
    if (formData.description.length < 50) {
      newErrors.description = 'La description doit faire au moins 50 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      const sessionData = {
        ...formData,
        availableSlots: timeSlots.map((slot, index) => ({
          ...slot,
          id: session ? session.availableSlots[index]?.id || `slot-${Date.now()}-${index}` : `slot-${Date.now()}-${index}`,
          sessionId: session?.id || '',
        }))
      };

      if (session) {
        updateSession(session.id, sessionData);
      } else {
        addSession(sessionData);
      }

      onClose();
    } catch (error) {
      console.error('Error saving session:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="session-form-container">
      <div className="session-form-header">
        <h2>{session ? 'Modifier la Session' : 'Nouvelle Session'}</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <form onSubmit={handleSubmit} className="session-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name">Nom de la session *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={errors.name ? 'error' : ''}
              placeholder="Ex: La Maison Hantée"
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="theme">Thème *</label>
            <input
              type="text"
              id="theme"
              name="theme"
              value={formData.theme}
              onChange={handleInputChange}
              className={errors.theme ? 'error' : ''}
              placeholder="Ex: Horreur, Mystère"
            />
            {errors.theme && <span className="error-text">{errors.theme}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="duration">Durée (minutes) *</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              className={errors.duration ? 'error' : ''}
              min="30"
              max="180"
            />
            {errors.duration && <span className="error-text">{errors.duration}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Prix (€) *</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className={errors.price ? 'error' : ''}
              min="10"
              max="100"
            />
            {errors.price && <span className="error-text">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="minParticipants">Participants minimum *</label>
            <input
              type="number"
              id="minParticipants"
              name="minParticipants"
              value={formData.minParticipants}
              onChange={handleInputChange}
              className={errors.minParticipants ? 'error' : ''}
              min="1"
              max="10"
            />
            {errors.minParticipants && <span className="error-text">{errors.minParticipants}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="maxParticipants">Participants maximum *</label>
            <input
              type="number"
              id="maxParticipants"
              name="maxParticipants"
              value={formData.maxParticipants}
              onChange={handleInputChange}
              className={errors.maxParticipants ? 'error' : ''}
              min="1"
              max="20"
            />
            {errors.maxParticipants && <span className="error-text">{errors.maxParticipants}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="difficulty">Difficulté *</label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleInputChange}
            >
              <option value="Facile">Facile</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Difficile">Difficile</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="image">URL de l'image</label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className={errors.description ? 'error' : ''}
            rows={4}
            placeholder="Décrivez l'expérience d'escape game..."
          />
          {errors.description && <span className="error-text">{errors.description}</span>}
          <div className="char-count">
            {formData.description.length} caractères (minimum 50)
          </div>
        </div>

        <div className="time-slots-section">
          <div className="time-slots-header">
            <h3>Créneaux horaires</h3>
            <button type="button" onClick={addTimeSlot} className="add-slot-btn">
              ➕ Ajouter un créneau
            </button>
          </div>
          
          <div className="time-slots-list">
            {timeSlots.map((slot, index) => (
              <div key={index} className="time-slot-item">
                <input
                  type="datetime-local"
                  value={slot.dateTime}
                  onChange={(e) => updateTimeSlot(index, 'dateTime', e.target.value)}
                />
                <input
                  type="number"
                  value={slot.maxCapacity}
                  onChange={(e) => updateTimeSlot(index, 'maxCapacity', parseInt(e.target.value) || 0)}
                  min="1"
                  max="20"
                  placeholder="Capacité max"
                />
                <button 
                  type="button" 
                  onClick={() => removeTimeSlot(index)}
                  className="remove-slot-btn"
                >
                  🗑️
                </button>
              </div>
            ))}
            {timeSlots.length === 0 && (
              <div className="no-slots">
                Aucun créneau défini. Ajoutez des créneaux pour permettre les réservations.
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} className="cancel-btn">
            Annuler
          </button>
          <button type="submit" disabled={isSubmitting} className="submit-btn">
            {isSubmitting ? 'Enregistrement...' : (session ? 'Mettre à jour' : 'Créer la session')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionForm;
