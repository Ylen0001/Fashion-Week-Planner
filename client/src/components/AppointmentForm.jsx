function AppointmentForm({
    brandName,
    setBrandName,
    appointmentDate,
    setAppointmentDate,
    location,
    setLocation,
    notes,
    setNotes,
    handleSubmit
}) {
  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="brandName">Brand name</label>
            <input
            id="brandName"
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
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
            />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Notes</label>
            <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            />
      </div>

      <button className="button" type="submit">
        Add appointment
      </button>
    </form>
  );
}

export default AppointmentForm;