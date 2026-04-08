import AppointmentItem from "./AppointmentItem.jsx"

function AppointmentList({ appointments, handleDelete }) {
    return (
    <section className="appointments-section">
        <h2 className="section-title">Upcoming appointments</h2>

        {appointments.length === 0 ? (
          <p className="empty-state">No appointments yet</p>
        ) : (
          <ul className="appointments-list">
            {appointments.map((appt) => (
                <AppointmentItem appt={appt} key={appt.id} handleDelete={handleDelete}/>
            ))}
          </ul>
        )}
      </section>
    )
}

export default AppointmentList;