import React from "react";
import Reservation from "./Reservation";

function ReservationsTable({ reservations }) {
  const allReservations = reservations.map((reservation, key) => {
    return <Reservation reservation={reservation} key={key}/>
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Number</th>
          <th scope="col">Time</th>
          <th scope="col"># of People</th>
          <th scope="col">Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody  className="table-group-divider">
        {allReservations}
      </tbody>
    </table>
  )
}

export default ReservationsTable;