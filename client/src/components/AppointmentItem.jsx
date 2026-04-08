function AppointmentItem({ appt, handleDelete }) {
    return(
              <li className="appointment-item">
                <strong>{appt.brandName}</strong>
                <span>{new Date(appt.appointmentDate).toLocaleString()}</span>
                <button type="button"
                className="delete-button" 
                onClick={() => handleDelete(appt.id)}>Delete</button>
              </li>
    )
}

export default AppointmentItem;