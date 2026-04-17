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
    if(!token){
      console.log("No token found");
      return;
    }
    fetch("http://localhost:3000/appointments", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3000/appointments/${id}`, {
        method: "DELETE",
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const res = await fetch("http://localhost:3000/appointments", {
        method: "POST",
        headers: {
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
    <Route path="/auth" element={<AuthPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>}></Route>
    <Route path="/account" element={<AccountPage currentUser={currentUser} handleLogout={handleLogout}/>}></Route>
    </Routes>
  </div>
);
}

export default App;