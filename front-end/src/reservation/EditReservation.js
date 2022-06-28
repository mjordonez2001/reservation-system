import React from "react";
import ReservationForm from "./ReservationForm";

// defines the page that edits an existing reservation
function EditReservation() {
  return (
    <>
      <h2 className="d-flex justify-content-center mb-4">Edit Reservation</h2>
      <ReservationForm formType={"edit"} />
    </>
  )
}

export default EditReservation;