import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Session, Booking, TimeSlot, SessionContextType } from '../types';

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

// Default sessions based on the existing data, converted to new format
const defaultSessions: Session[] = [
  {
    id: '1',
    name: "Rock'N SPY",
    theme: "Musique, Espionnage",
    duration: 60,
    price: 35,
    minParticipants: 2,
    maxParticipants: 6,
    difficulty: 'Intermédiaire',
    description: "1975, Nicky Brighton est une célèbre star du rock anglais. Les services secrets britanniques pensent qu'il s'agit en réalité d'un agent du KGB, qui détiendrait une photographie compromettante d'un haut fonctionnaire anglais qui aurait collaboré avec l'ennemi pendant la Guerre. Vous, agents du MI6, êtes chargés de vous infiltrer dans le pied à terre parisien de Nicky pour confirmer cette information et trouver cette photo afin que le MI6 puisse arrêter le traître anglais et intercepter Nicky avant qu'il ne prenne la fuite pour l'URSS ! L'honneur de la Couronne en dépend, faites vite agents !",
    image: "/sessions/rock-n-spy.jpg",
    availableSlots: []
  },
  {
    id: '2',
    name: "Dr Kang",
    theme: "Aventure",
    duration: 60,
    price: 32,
    minParticipants: 2,
    maxParticipants: 5,
    difficulty: 'Intermédiaire',
    description: "Après son échec à anéantir toute forme de vie sur terre, l'infâme Dr Kang a enlevé une des plus brillantes chimistes au monde afin de lui extorquer les connaissances nécessaires à son nouveau plan. Vous partirez en mission de sauvetage dans le repaire de Kang, en espérant que vous n'arrivez pas trop tard...",
    image: "/sessions/dr-kang.jpg",
    availableSlots: []
  },
  {
    id: '3',
    name: "Contagion",
    theme: "Apocalypse",
    duration: 75,
    price: 40,
    minParticipants: 2,
    maxParticipants: 6,
    difficulty: 'Difficile',
    description: "Nous sommes en 1992, une étrange épidémie fait des ravages dans le pays. Le professeur Sabatier, éminent virologue, prétend avoir trouvé un antidote grâce à ses recherches sur des rats. Mais étrangement, il disparaît juste après cette annonce. Vous êtes les meilleurs scientifiques et vous devez fouiller son laboratoire dans l'espoir de trouver ce fameux antidote avant qu'il ne soit trop tard...",
    image: "/sessions/contagion.jpg",
    availableSlots: []
  },
  {
    id: '4',
    name: "Ghost",
    theme: "Disparition, Mystère",
    duration: 90,
    price: 45,
    minParticipants: 2,
    maxParticipants: 6,
    difficulty: 'Difficile',
    description: "Une vielle dame passionnée d'occultisme a été assassinée il y a plus de 40 ans dans cet appartement. Personne ne sait ce qui s'est réellement passé. Aucun de ceux qui y sont entrés n'en sont revenus. Il parait que le seul moyen d'en sortir vivant serait de trouver le nom de son assassin. Par sécurité, nous en avons condamné l'accès, mais nous pouvons vous l'ouvrir si vous voulez vraiment tenter votre chance...",
    image: "/sessions/ghost.jpg",
    availableSlots: []
  }
];

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [sessions, setSessions] = useLocalStorage<Session[]>('horror-house-sessions', defaultSessions);
  const [bookings, setBookings] = useLocalStorage<Booking[]>('horror-house-bookings', []);

  const addSession = (sessionData: Omit<Session, 'id'>) => {
    const newSession: Session = {
      ...sessionData,
      id: Date.now().toString(),
    };
    setSessions(prev => [...prev, newSession]);
  };

  const updateSession = (id: string, sessionData: Partial<Session>) => {
    setSessions(prev => prev.map(session => 
      session.id === id ? { ...session, ...sessionData } : session
    ));
  };

  const deleteSession = (id: string) => {
    setSessions(prev => prev.filter(session => session.id !== id));
    // Also remove related bookings
    setBookings(prev => prev.filter(booking => booking.sessionId !== id));
  };

  const addBooking = (bookingData: Omit<Booking, 'id' | 'bookingDate'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };
    setBookings(prev => [...prev, newBooking]);
    
    // Update the time slot to reflect the booking
    updateTimeSlotBooking(bookingData.timeSlotId, bookingData.participantCount);
  };

  const cancelBooking = (bookingId: string) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      setBookings(prev => prev.map(b => 
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      ));
      
      // Update the time slot to reflect the cancellation
      updateTimeSlotBooking(booking.timeSlotId, -booking.participantCount);
    }
  };

  const updateTimeSlotBooking = (timeSlotId: string, participantChange: number) => {
    setSessions(prev => prev.map(session => ({
      ...session,
      availableSlots: session.availableSlots.map(slot => 
        slot.id === timeSlotId 
          ? { 
              ...slot, 
              currentBookings: Math.max(0, slot.currentBookings + participantChange),
              isBooked: (slot.currentBookings + participantChange) >= slot.maxCapacity
            }
          : slot
      )
    })));
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
    addSession,
    updateSession,
    deleteSession,
    addBooking,
    cancelBooking,
    getAvailableSlots,
    getSessionBookings,
  };

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
};
