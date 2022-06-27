import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation, updateReservation, createReservation } from "../utils/api";

// form that creates a new reservation
function ReservationForm({ formType }) {

  // initializes form data for the reservationData state
  const initialFormData = {
    first_name: "", 
    last_name: "", 
    mobile_number: "", 
    reservation_date: "",
    reservation_time: "",
    people: ""
  };
  const [reservationData, setReservationData] = useState({...initialFormData});
  const [reservation, setReservation] = useState(null)
  const [reservationsError, setReservationsError] = useState(null);
  const history = useHistory();
  const reservation_id = useParams().reservation_id;

  // reads and loads a reservation if a reservation_id is given
  useEffect(() => {
    const abortController = new AbortController();

    if (reservation_id) {
      async function loadReservation() {
        setReservationsError(null);
  
        readReservation(reservation_id, abortController.signal)
          .then(setReservation)
          .catch(setReservationsError)
      }
      loadReservation();
    }
    return () => abortController.abort();
  }, [reservation_id]);

  // if a reservation has loaded, it sets the reservationData to the current data in the reservation
  useEffect(() => {
    if (reservation) {
      setReservationData({
        first_name: reservation.first_name, 
        last_name: reservation.last_name, 
        mobile_number: reservation.mobile_number, 
        reservation_date: reservation.reservation_date.slice(0, 10),
        reservation_time: reservation.reservation_time,
        people: reservation.people,
        reservation_id: reservation.reservation_id
      });
    }
  }, [reservation])

  // updates reservationData on change
  const handleChange = ({ target }) => {
    if (target.name === "people") {;
      setReservationData({
        ...reservationData,
        [target.name]: Number(target.value)
      });
    } else {
      setReservationData({
        ...reservationData,
        [target.name]: target.value
      });
    }
  };

  // on form submittion, it creates a new reservation and then sends the user back to the dashboard
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      if (formType === "create") await createReservation(reservationData, abortController.signal);
      else if (formType === "edit") await updateReservation(reservationData, abortController.signal);
      setReservationData({...initialFormData});
      history.push(`/dashboard?date=${reservationData.reservation_date}`);

    } catch (error) {
      setReservationsError(error);
    }
  }

  // when the user hits cancel, it takes them back to the previous page
  const handleCancel = () => history.goBack();

  // html
  return (
    <>
      <h2 className="d-flex justify-content-center mb-4">{formType === "create" ? "Create reservation" : "Edit reservation" }</h2>
      <ErrorAlert error={reservationsError} />
      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="col-6">
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              name="first_name"
              value={reservationData.first_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input 
              type="text"
              className="form-control"
              id="last_name"
              name="last_name"
              value={reservationData.last_name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile_number">Mobile Number</label>
            <input 
              type="text"
              placeholder="###-###-####"
              className="form-control"
              id="mobile_number"
              name="mobile_number"
              value={reservationData.mobile_number}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_date">Reservation Date</label>
            <input 
              type="date"
              className="form-control"
              id="reservation_date"
              name="reservation_date"
              value={reservationData.reservation_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="reservation_time">Reservation Time</label>
            <input 
              type="time"
              className="form-control"
              id="reservation_time"
              name="reservation_time"
              value={reservationData.reservation_time}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="people">Party Size</label>
            <input 
              type="number"
              className="form-control"
              id="people"
              name="people"
              value={reservationData.people}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary mr-4">Submit</button>
            <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ReservationForm;
