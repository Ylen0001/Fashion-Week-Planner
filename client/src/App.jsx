import { useEffect, useState } from "react";

function App() {
  const [appointments, setAppointments] = useState([]); // [] = On attend une liste d'appointments.

  const [brandName, setBrandName] = useState(""); // State 1 / champ brandName
  const [appointmentDate, setAppointmentDate] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  // La première fois que le component react App est appelé : on demande au back de nous envoyer la liste des appointment présents dans la DB
  useEffect(() => {
    fetch("http://localhost:3000/appointments")
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
      })
      .catch((err) => console.error(err));
  }, []); // Le [] ici signifie "Lance cette fonction une seule fois au démarrage"


  /* (e) est un objet react, qui correspond à un event. 
  Ici, il contient e.target (l'élément concerné, ici l'input) 
  et e.value (La valeur actuelle du champs) */
  const handleSubmit = async (e) => {
    e.preventDefault();
    /* Empêche le comportement normal du navigateur. 
    Pour ne pas que le navigateur recharge la page, mais que 
    React s'en charge au on-click sur le bouton submit */

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

      setAppointments([...appointments, createdAppointment]);

      setBrandName("");
      setAppointmentDate("");
      setLocation("");
      setNotes("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Appointments</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Brand name</label>
          <br />
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </div>

        <div>
          <label>Appointment date</label>
          <br />
          <input
            type="datetime-local"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>

        <div>
          <label>Location</label>
          <br />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label>Notes</label>
          <br />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button type="submit">Add appointment</button>
      </form>

      <hr />

      {appointments.length === 0 ? (
        <p>No appointments yet</p>
      ) : (
        <ul>
          {appointments.map((appt) => (
            <li key={appt.id}>
              <strong>{appt.brandName}</strong> —{" "}
              {new Date(appt.appointmentDate).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

/* Lorsqu'un champs est modifié, onChange se déclenche, envoie a React e.target.value, et setX met à jour le state, ce qui fait que React re-render
le champ et le paragraphe affichent la nouvelle valeur. 
React relance le composant, fais une diff entre l'ancienne version du composant et la nouvelle, et modifie ce qui a changé uniquement.  */