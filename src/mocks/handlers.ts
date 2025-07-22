import { http, HttpResponse } from 'msw';

// Types for our API
interface Session {
  id: string;
  name: string;
  theme: string;
  duration: number;
  price: number;
  minParticipants: number;
  maxParticipants: number;
  description: string;
  image: string;
  difficulty: 'Facile' | 'Intermédiaire' | 'Difficile';
  availableSlots: TimeSlot[];
}

interface TimeSlot {
  id: string;
  sessionId: string;
  dateTime: string;
  isBooked: boolean;
  maxCapacity: number;
  currentBookings: number;
}

interface Booking {
  id: string;
  sessionId: string;
  timeSlotId: string;
  customerEmail: string;
  participantCount: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
  customerName?: string;
  customerPhone?: string;
}

interface Employee {
  id: string;
  username: string;
  password: string;
  name: string;
  role: 'admin' | 'employee';
}

// In-memory data store
let sessions: Session[] = [
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
    availableSlots: [
      {
        id: 'slot-1-1',
        sessionId: '1',
        dateTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        isBooked: false,
        maxCapacity: 6,
        currentBookings: 0
      },
      {
        id: 'slot-1-2',
        sessionId: '1',
        dateTime: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
        isBooked: false,
        maxCapacity: 6,
        currentBookings: 0
      }
    ]
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
    availableSlots: [
      {
        id: 'slot-2-1',
        sessionId: '2',
        dateTime: new Date(Date.now() + 36 * 60 * 60 * 1000).toISOString(),
        isBooked: false,
        maxCapacity: 5,
        currentBookings: 0
      }
    ]
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
    availableSlots: [
      {
        id: 'slot-3-1',
        sessionId: '3',
        dateTime: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
        isBooked: false,
        maxCapacity: 6,
        currentBookings: 0
      }
    ]
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
    availableSlots: [
      {
        id: 'slot-4-1',
        sessionId: '4',
        dateTime: new Date(Date.now() + 96 * 60 * 60 * 1000).toISOString(),
        isBooked: false,
        maxCapacity: 6,
        currentBookings: 0
      }
    ]
  }
];

let bookings: Booking[] = [];

const employees: Employee[] = [
  {
    id: '1',
    username: 'admin',
    password: 'admin123',
    name: 'Administrateur',
    role: 'admin'
  },
  {
    id: '2',
    username: 'employee',
    password: 'emp123',
    name: 'Employé',
    role: 'employee'
  }
];

// Utility function to generate IDs
const generateId = () => Date.now().toString();

export const handlers = [
  // Authentication endpoints
  http.post('/api/auth/login', async ({ request }) => {
    const { username, password } = await request.json() as { username: string; password: string };
    
    const employee = employees.find(emp => 
      emp.username === username && emp.password === password
    );
    
    if (employee) {
      const { password: _, ...employeeWithoutPassword } = employee;
      return HttpResponse.json({ 
        success: true, 
        employee: employeeWithoutPassword,
        token: 'mock-jwt-token'
      });
    }
    
    return HttpResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  // Sessions endpoints
  http.get('/api/sessions', () => {
    return HttpResponse.json(sessions);
  }),

  http.post('/api/sessions', async ({ request }) => {
    const sessionData = await request.json() as Omit<Session, 'id'>;
    const newSession: Session = {
      ...sessionData,
      id: generateId(),
    };
    sessions.push(newSession);
    return HttpResponse.json(newSession, { status: 201 });
  }),

  http.put('/api/sessions/:id', async ({ params, request }) => {
    const { id } = params;
    const sessionData = await request.json() as Partial<Session>;
    
    const sessionIndex = sessions.findIndex(s => s.id === id);
    if (sessionIndex === -1) {
      return HttpResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }
    
    sessions[sessionIndex] = { ...sessions[sessionIndex], ...sessionData };
    return HttpResponse.json(sessions[sessionIndex]);
  }),

  http.delete('/api/sessions/:id', ({ params }) => {
    const { id } = params;
    const sessionIndex = sessions.findIndex(s => s.id === id);
    
    if (sessionIndex === -1) {
      return HttpResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }
    
    sessions.splice(sessionIndex, 1);
    // Remove related bookings
    bookings = bookings.filter(booking => booking.sessionId !== id);
    
    return HttpResponse.json({ success: true });
  }),

  // Bookings endpoints
  http.get('/api/bookings', () => {
    return HttpResponse.json(bookings);
  }),

  http.post('/api/bookings', async ({ request }) => {
    const bookingData = await request.json() as Omit<Booking, 'id' | 'bookingDate'>;
    const newBooking: Booking = {
      ...bookingData,
      id: generateId(),
      bookingDate: new Date().toISOString(),
      status: 'confirmed'
    };
    
    bookings.push(newBooking);
    
    // Update the time slot
    const session = sessions.find(s => s.id === bookingData.sessionId);
    if (session) {
      const slot = session.availableSlots.find(slot => slot.id === bookingData.timeSlotId);
      if (slot) {
        slot.currentBookings += bookingData.participantCount;
        slot.isBooked = slot.currentBookings >= slot.maxCapacity;
      }
    }
    
    return HttpResponse.json(newBooking, { status: 201 });
  }),

  http.delete('/api/bookings/:id', ({ params }) => {
    const { id } = params;
    const bookingIndex = bookings.findIndex(b => b.id === id);
    
    if (bookingIndex === -1) {
      return HttpResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    const booking = bookings[bookingIndex];
    bookings[bookingIndex] = { ...booking, status: 'cancelled' };
    
    // Update the time slot
    const session = sessions.find(s => s.id === booking.sessionId);
    if (session) {
      const slot = session.availableSlots.find(slot => slot.id === booking.timeSlotId);
      if (slot) {
        slot.currentBookings = Math.max(0, slot.currentBookings - booking.participantCount);
        slot.isBooked = slot.currentBookings >= slot.maxCapacity;
      }
    }
    
    return HttpResponse.json({ success: true });
  }),
];
