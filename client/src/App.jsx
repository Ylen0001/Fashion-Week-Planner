import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import "./App.css";
import AppointmentForm from "./components/AppointmentForm.jsx"
import AppointmentList from "./components/AppointmentList.jsx"
import AuthPage from "./pages/AuthPage.jsx"
import AccountPage from "./pages/AccountPage.jsx"
import { Routes, Route } from "react-router-dom"

function App() {
  const [appointments, setAppointments] = useState([]);

  const [brandName, setBrandName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const authHeaders = { Authorization: `Bearer ${token}` };

    const loadSession = async () => {
      try {
        const [meRes, appointmentsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/auth/me`, { headers: authHeaders }),
          fetch(`${import.meta.env.VITE_API_URL}/appointments`, { headers: authHeaders }),
        ]);

        if (!meRes.ok || !appointmentsRes.ok) {
          throw new Error("Unauthorized");
        }

        const user = await meRes.json();
        const appointments = await appointmentsRes.json();

        setCurrentUser(user);
        setAppointments(appointments);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        setCurrentUser(null);
        setAppointments([]);
      }
    };

    loadSession();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if(!token){
      console.error("No token found");
      return;
    }

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/appointments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      setAppointments((prev) =>
        prev.filter((appt) => appt.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    setAppointments([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if(!token){
      console.error("No token found");
      alert("Please login before adding appointments");
      return;
    }

    if(!brandName || !appointmentDate || !location){
      alert("Please fill in all required fields.");
      return;
    }

    const newAppointment = {
      brandName,
      appointmentDate,
      location,
      notes,
    };

    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/appointments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAppointment),
      });
      
      const createdAppointment = await res.json();
      
      setAppointments((prevAppointments) => [
      ...prevAppointments,
      createdAppointment,
      ]);

      setBrandName("");
      setAppointmentDate("");
      setLocation("");
      setNotes("");
    } catch (error) {
      console.error(error);
    }
  };

return (
  <div className="app">
    <Header />

    <Routes>
      <Route
        path="/"
        element={
          <>
            <h1 className="page-title">My Appointments </h1>
            {currentUser && <p>Welcome, {currentUser.username}</p>}

            <AppointmentForm
              brandName={brandName}
              setBrandName={setBrandName}
              appointmentDate={appointmentDate}
              setAppointmentDate={setAppointmentDate}
              location={location}
              setLocation={setLocation}
              notes={notes}
              setNotes={setNotes}
              handleSubmit={handleSubmit}
            />
            
            <AppointmentList
              appointments={appointments}
              handleDelete={handleDelete}
            />
          </>
        }
      />
    <Route path="/auth" element={<AuthPage setCurrentUser={setCurrentUser}/>}></Route>
    <Route path="/account" element={<AccountPage currentUser={currentUser} handleLogout={handleLogout}/>}></Route>
    </Routes>
  </div>
);
}

export default App;