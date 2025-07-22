import React, { createContext, useContext, useState, useEffect } from 'react';
import { sessionsApi, bookingsApi, LoadingState, createLoadingState, setLoading } from '../services/api.ts';

export interface TimeSlot {
  id: string;
  sessionId: string;
  dateTime: string; // ISO string
  isBooked: boolean;
  maxCapacity: number;
  currentBookings: number;
}

export interface Session {
  id: string;
  name: string;
  theme: string;
  duration: number; // in minutes
  price: number; // in euros
  minParticipants: number;
  maxParticipants: number;
  description: string;
  image: string;
  difficulty: 'Facile' | 'Intermédiaire' | 'Difficile';
  availableSlots: TimeSlot[];
}

export interface Booking {
  id: string;
  sessionId: string;
  timeSlotId: string;
  customerEmail: string;
  participantCount: number;
  bookingDate: string; // ISO string
  status: 'confirmed' | 'cancelled';
  customerName?: string;
  customerPhone?: string;
}

export interface SessionContextType {
  sessions: Session[];
  bookings: Booking[];
  loading: LoadingState;
  addSession: (session: Omit<Session, 'id'>) => Promise<boolean>;
  updateSession: (id: string, session: Partial<Session>) => Promise<boolean>;
  deleteSession: (id: string) => Promise<boolean>;
  addBooking: (booking: Omit<Booking, 'id' | 'bookingDate'>) => Promise<boolean>;
  cancelBooking: (bookingId: string) => Promise<boolean>;
  getAvailableSlots: (sessionId: string) => TimeSlot[];
  getSessionBookings: (sessionId: string) => Booking[];
  refreshData: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

interface SessionProviderProps {
  children: React.ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoadingState] = useState<LoadingState>(createLoadingState());

  // Load initial data
  const refreshData = async () => {
    setLoadingState(setLoading(loading, true));

    try {
      const [sessionsResponse, bookingsResponse] = await Promise.all([
        sessionsApi.getAll(),
        bookingsApi.getAll()
      ]);

      if (sessionsResponse.success && sessionsResponse.data) {
        setSessions(sessionsResponse.data);
      }

      if (bookingsResponse.success && bookingsResponse.data) {
        setBookings(bookingsResponse.data);
      }

      setLoadingState(setLoading(loading, false));
    } catch (error) {
      setLoadingState(setLoading(loading, false, 'Failed to load data'));
    }
  };

  // Load data on mount
  useEffect(() => {
    refreshData();
  }, []);

  const addSession = async (sessionData: Omit<Session, 'id'>): Promise<boolean> => {
    setLoadingState(setLoading(loading, true));

    try {
      const response = await sessionsApi.create(sessionData);

      if (response.success && response.data) {
        setSessions(prev => [...prev, response.data]);
        setLoadingState(setLoading(loading, false));
        return true;
      } else {
        setLoadingState(setLoading(loading, false, response.error || 'Failed to create session'));
        return false;
      }
    } catch (error) {
      setLoadingState(setLoading(loading, false, 'Network error occurred'));
      return false;
    }
  };

  const updateSession = async (id: string, sessionData: Partial<Session>): Promise<boolean> => {
    setLoadingState(setLoading(loading, true));

    try {
      const response = await sessionsApi.update(id, sessionData);

      if (response.success && response.data) {
        setSessions(prev => prev.map(session =>
          session.id === id ? response.data : session
        ));
        setLoadingState(setLoading(loading, false));
        return true;
      } else {
        setLoadingState(setLoading(loading, false, response.error || 'Failed to update session'));
        return false;
      }
    } catch (error) {
      setLoadingState(setLoading(loading, false, 'Network error occurred'));
      return false;
    }
  };

  const deleteSession = async (id: string): Promise<boolean> => {
    setLoadingState(setLoading(loading, true));

    try {
      const response = await sessionsApi.delete(id);

      if (response.success) {
        setSessions(prev => prev.filter(session => session.id !== id));
        setBookings(prev => prev.filter(booking => booking.sessionId !== id));
        setLoadingState(setLoading(loading, false));
        return true;
      } else {
        setLoadingState(setLoading(loading, false, response.error || 'Failed to delete session'));
        return false;
      }
    } catch (error) {
      setLoadingState(setLoading(loading, false, 'Network error occurred'));
      return false;
    }
  };

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'bookingDate'>): Promise<boolean> => {
    setLoadingState(setLoading(loading, true));

    try {
      const response = await bookingsApi.create(bookingData);

      if (response.success && response.data) {
        setBookings(prev => [...prev, response.data]);
        // Refresh sessions to get updated slot information
        await refreshData();
        setLoadingState(setLoading(loading, false));
        return true;
      } else {
        setLoadingState(setLoading(loading, false, response.error || 'Failed to create booking'));
        return false;
      }
    } catch (error) {
      setLoadingState(setLoading(loading, false, 'Network error occurred'));
      return false;
    }
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    setLoadingState(setLoading(loading, true));

    try {
      const response = await bookingsApi.cancel(bookingId);

      if (response.success) {
        setBookings(prev => prev.map(b =>
          b.id === bookingId ? { ...b, status: 'cancelled' } : b
        ));
        // Refresh sessions to get updated slot information
        await refreshData();
        setLoadingState(setLoading(loading, false));
        return true;
      } else {
        setLoadingState(setLoading(loading, false, response.error || 'Failed to cancel booking'));
        return false;
      }
    } catch (error) {
      setLoadingState(setLoading(loading, false, 'Network error occurred'));
      return false;
    }
  };

  const getAvailableSlots = (sessionId: string): TimeSlot[] => {
    const session = sessions.find(s => s.id === sessionId);
    return session ? session.availableSlots.filter(slot => !slot.isBooked) : [];
  };

  const getSessionBookings = (sessionId: string): Booking[] => {
    return bookings.filter(booking => booking.sessionId === sessionId && booking.status === 'confirmed');
  };

  const value: SessionContextType = {
    sessions,
    bookings,
    loading,
    addSession,
    updateSession,
    deleteSession,
    addBooking,
    cancelBooking,
    getAvailableSlots,
    getSessionBookings,
    refreshData,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
