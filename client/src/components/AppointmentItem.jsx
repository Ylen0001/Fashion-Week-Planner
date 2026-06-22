function AppointmentItem({ appt, handleDelete, handleEdit }) {
    return(
              <li className="appointment-item">
                <strong>{appt.brandName}</strong>
                <span>{appt.location}</span>
                <span>{new Date(appt.appointmentDate).toLocaleString()}</span>
                <div className="appointment-item__actions">
                  <button
                    type="button"
                    className="button button--secondary appointment-item__button"
                    onClick={() => handleEdit(appt)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="delete-button appointment-item__button"
                    onClick={() => handleDelete(appt.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
    )
}

export default AppointmentItem;