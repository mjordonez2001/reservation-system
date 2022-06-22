import React from "react";
import { useHistory } from "react-router-dom";

function Reservation({ reservation }) {
  const history = useHistory();

  // seats the reservation on button click
  const handleSeat = () => {
    history.push(`/reservations/${reservation.reservation_id}/seat`);
  }

  // sends the user to the edit form on button click
  const handleEdit = () => {
    history.push(`/reservations/${reservation.reservation_id}/edit`)
  }

  // cancels the reservation on button click
  const handleCancel = () => {

  }

  // seat button
  const seatButton = <button 
    type="button" 
    className="btn btn-success" 
    href={`/reservations/${reservation.reservation_id}/seat`} 
    onClick={handleSeat}>
      Seat
    </button>

  // edit button
  const editButton = <button 
    type="button" 
    className="btn btn-primary" 
    href={`/reservations/${reservation.reservation_id}/edit`} 
    onClick={handleEdit}>
      Edit
    </button>

  // cancel button
  const cancelButton = <button 
    type="button" 
    className="btn btn-danger" 
    data-reservation-id-cancel={reservation.reservation_id}
    onClick={handleCancel}>
      Cancel
    </button>

  // html
  return (
    <tr>
      <th scope="row">{reservation.reservation_id}</th>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
      <td>{reservation.status === "booked" ?  seatButton : <></>}</td>
      <td>{reservation.status === "booked" ?  editButton : <></>}</td>
      <td>{cancelButton}</td>
    </tr>
  )
}

export default Reservation;