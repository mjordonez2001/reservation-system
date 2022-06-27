import React, { useState } from "react";
import Reservation from "./Reservation";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationsTable({ reservations }) {
  const [cancelError, setCancelError] = useState(null);

  const allReservations = reservations.map((reservation) => {
    return <Reservation reservation={reservation} key={reservation.reservation_id} setCancelError={setCancelError} />
  });

  return (
    <>
      <ErrorAlert error={cancelError} />
      <h4 className="d-flex justify-content-center">Reservations</h4>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr className="table-primary">
              <th scope="col">ID</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Number</th>
              <th scope="col">Time</th>
              <th scope="col">People</th>
              <th scope="col">Status</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody  className="table-group-divider">
            {allReservations}
          </tbody>
        </table>
      </div>
      
    </>
  )
}

export default ReservationsTable;