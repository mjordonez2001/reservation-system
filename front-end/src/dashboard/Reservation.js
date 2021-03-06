import React from "react";
import { useHistory } from "react-router-dom";
import { updateStatus } from "../utils/api";

// defines a single reservation as a table element
function Reservation({ reservation, setCancelError }) {
  const history = useHistory();

  // sends the user to the seat page
  const handleSeat = () => {
    history.push(`/reservations/${reservation.reservation_id}/seat`);
  }

  // sends the user to the edit form
  const handleEdit = () => {
    history.push(`/reservations/${reservation.reservation_id}/edit`)
  }

  // prompts the user to confirm cancel reservation
  async function handleCancel() {
    if (window.confirm("Do you want to cancel this reservation? This cannot be undone.")) {
      try {
        // updates the reservation to cancelled, then reloads the page
        await updateStatus(reservation.reservation_id, "cancelled");
        window.location.reload();
      } catch (error) {
        setCancelError(error);
      }
    }
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
      <th scope="row" className="align-middle">{reservation.reservation_id}</th>
      <td className="align-middle">{reservation.first_name}</td>
      <td className="align-middle">{reservation.last_name}</td>
      <td className="align-middle">{reservation.mobile_number}</td>
      <td className="align-middle">{reservation.reservation_time}</td>
      <td className="align-middle">{reservation.people}</td>
      <td className="align-middle" data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
      <td className="align-middle">{reservation.status === "booked" ?  seatButton : <></>}</td>
      <td className="align-middle">{reservation.status === "booked" ?  editButton : <></>}</td>
      <td className="align-middle">{reservation.status !== "cancelled" && reservation.status !==  "finished" ?  cancelButton : <></>}</td>
    </tr>
  )
}

export default Reservation;