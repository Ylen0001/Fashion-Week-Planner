import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import "./App.css";
import AppointmentForm from "./components/AppointmentForm.jsx"
import AppointmentList from "./components/AppointmentList.jsx"
import AuthPage from "./pages/AuthPage.jsx"
import AccountPage from "./pages/AccountPage.jsx"
import { Routes, Route } from "react-router-dom"

function toDatetimeLocalValue(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";

  const pad = (value) => String(value).padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function App() {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [brandName, setBrandName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const reloadAppointments = async (token) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      throw new Error("Failed to load appointments");
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error("Invalid appointments response");
    }

    setAppointments(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    const authHeaders = { Authorization: `Bearer ${token}` };

    const loadSession = async () => {
      try {
        const meRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
          headers: authHeaders,
        });

        if (!meRes.ok) {
          throw new Error("Unauthorized");
        }

        const user = await meRes.json();
        await reloadAppointments(token);

        setCurrentUser(user);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        setCurrentUser(null);
        setAppointments([]);
      }
    };

    loadSession();
  }, []);

  const resetForm = () => {
    setBrandName("");
    setAppointmentDate("");
    setLocation("");
    setNotes("");
    setEditingId(null);
  };

  const handleEdit = (appt) => {
    setEditingId(appt.id);
    setBrandName(appt.brandName);
    setAppointmentDate(toDatetimeLocalValue(appt.appointmentDate));
    setLocation(appt.location);
    setNotes(appt.notes ?? "");
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    if (id == null) {
      console.error("Invalid appointment id");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/appointments/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Could not delete appointment");
        return;
      }

      await reloadAppointments(token);
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
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

    const appointmentData = {
      brandName,
      appointmentDate,
      location,
      notes,
    };

    const isEditing = editingId !== null;
    const url = isEditing
      ? `${import.meta.env.VITE_API_URL}/appointments/${editingId}`
      : `${import.meta.env.VITE_API_URL}/appointments`;

    try {
      const res = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      await reloadAppointments(token);
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Network error. Please try again.");
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
              editingId={editingId}
              onCancelEdit={handleCancelEdit}
            />
            
            <AppointmentList
              appointments={appointments}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
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