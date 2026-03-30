import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [appointments, setAppointments] = useState([]);

  const [brandName, setBrandName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/appointments")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      <h1 className="page-title">My Appointments</h1>

      <form className="card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="brandName">Brand name</label>
          <input
            id="brandName"
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Acne Studios, Khaite..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="appointmentDate">Appointment date</label>
          <input
            id="appointmentDate"
            type="datetime-local"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Paris showroom, Zoom..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Key details, collection notes, priorities..."
            rows="4"
          />
        </div>

        <button className="button" type="submit">
          Add appointment
        </button>
      </form>

      <section className="appointments-section">
        <h2 className="section-title">Upcoming appointments</h2>

        {appointments.length === 0 ? (
          <p className="empty-state">No appointments yet</p>
        ) : (
          <ul className="appointments-list">
            {appointments.map((appt) => (
              <li className="appointment-item" key={appt.id}>
                <strong>{appt.brandName}</strong>
                <span>{new Date(appt.appointmentDate).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;