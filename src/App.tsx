import { HashRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { SessionProvider } from "./contexts/SessionContext.tsx";
import Common from "./Common/Common.tsx";
import Homepage from "./Homepage/Homepage.tsx";
import Login from "./components/Login/Login.tsx";
import EmployeeDashboard from "./components/EmployeeDashboard/EmployeeDashboard.tsx";
import SessionList from "./components/Sessions/SessionList.tsx";
import BookingForm from "./components/Booking/BookingForm.tsx";

function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <SessionProvider>
                    <HashRouter>
                        <Routes>
                            <Route element={<Common />}>
                                <Route path="/" element={<Homepage />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                                <Route path="/sessions" element={<SessionList />} />
                                <Route path="/booking" element={<BookingForm />} />
                            </Route>
                        </Routes>
                    </HashRouter>
                </SessionProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;