import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

// creates a new reservation
function NewReservation() {
  // TO DO: be able to update data to API
  // TO DO: use history to go back when user clicks cancel button

  // initializes from data for the reservationData state
  const initialFormData = {
    first_name: "", 
    last_name: "", 
    mobile_numer: "", 
    reservation_date: "",
    reservation_time: "",
    people: "0"
  };
  const [reservationData, setReservationData] = useState({...initialFormData});
  const history = useHistory();

  // updates reservationData on change
  const handleChange = ({target}) => {
    setReservationData({
      ...reservationData,
      [target.name]: target.value
    });
  };

  // -- front end only -- sends the user back to dashboard after submission
  const handleSubmit = (event) => {
    event.preventDefault();

    setReservationData({...initialFormData});
    history.push(`/`);
  }

  // html
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={reservationData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input 
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={reservationData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="mobile_number">Mobile Number</label>
          <input 
            type="text"
            className="form-control"
            id="mobile_number"
            name="mobile_number"
            value={reservationData.mobile_numer}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="reservation_date">Reservation Date</label>
          <input 
            type="date"
            className="form-control"
            id="reservation_date"
            name="reservation_date"
            value={reservationData.reservation_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="reservation_time">Reservation Time</label>
          <input 
            type="time"
            className="form-control"
            id="reservation_time"
            name="reservation_time"
            value={reservationData.reservation_time}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="people">Party Size</label>
          <input 
            type="number"
            className="form-control"
            id="people"
            name="people"
            value={reservationData.people}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
        </div>
      </form>
    </>
  )
}

export default NewReservation
