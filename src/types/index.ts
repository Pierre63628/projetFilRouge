// Core types for the Horror House escape game application

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

export interface TimeSlot {
  id: string;
  sessionId: string;
  dateTime: string; // ISO string
  isBooked: boolean;
  maxCapacity: number;
  currentBookings: number;
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

export interface Employee {
  id: string;
  username: string;
  password: string; // In a real app, this would be hashed
  name: string;
  role: 'admin' | 'employee';
}

export interface AuthState {
  isAuthenticated: boolean;
  employee: Employee | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export interface ThemeState {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export interface SessionContextType {
  sessions: Session[];
  bookings: Booking[];
  addSession: (session: Omit<Session, 'id'>) => void;
  updateSession: (id: string, session: Partial<Session>) => void;
  deleteSession: (id: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'bookingDate'>) => void;
  cancelBooking: (bookingId: string) => void;
  getAvailableSlots: (sessionId: string) => TimeSlot[];
  getSessionBookings: (sessionId: string) => Booking[];
}
