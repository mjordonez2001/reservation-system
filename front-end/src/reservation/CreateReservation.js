import React from "react";
import ReservationForm from "./ReservationForm";

// defines the page that creates a new reservation
function CreateReservation() {
  return (
    <>
      <h2 className="d-flex justify-content-center mb-4">Create Reservation</h2>
      <ReservationForm formType={"create"} />
    </>
  )
}

export default CreateReservation;