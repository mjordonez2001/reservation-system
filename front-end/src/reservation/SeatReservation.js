import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, readReservation } from "../utils/api";
import { seatReservation } from "../utils/api";

// defines seat reservation form 
function SeatReservation() {

  const [table_id, setTable_id] = useState("");
  const [tables, setTables] = useState([]);
  const [reservation, setReservation] = useState({});

  // error states
  const [seatError, setSeatError] = useState(null);
  const [tablesError, setTablesError] = useState(null);
  const [reservationError, setReservationError] = useState(null);

  // takes the reservation_id based on the params
  const reservation_id = useParams().reservation_id;
  const history = useHistory();

  // loads all tables and current reservation
  useEffect(() => {
    const abortController = new AbortController();

    // loads all tables
    async function loadTables() {
      setTablesError(null);

      listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError)
    }

    // reads the reservation
    async function loadReservation() {
      setReservationError(null);

      readReservation(reservation_id)
        .then(setReservation)
        .catch(setReservationError);
    }

    loadReservation();
    loadTables();
    return () => abortController.abort();
  }, [reservation_id])

  // updates the table_id state on change
  const handleChange = ({ target }) => {
    setTable_id((currentTableId) => currentTableId = target.value);
  }

  // on form submittion, it updates the table with the new reservation
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    // updates the table then sends the user back to the dashboard
    try {
      await seatReservation(reservation_id, table_id, abortController.signal);
      history.push(`/dashboard`);
    } catch (error) {
      setSeatError(error);
    }
  }

  // when a user hits cancel, it takes them back to the previous page
  const handleCancel = () => history.goBack();

  // maps the available tables to option tags for the select tag
  const tableOptions = tables.map((table) => {
    return <option value={table.table_id} key={table.table_id}>{table.table_name} - {table.capacity}</option>;
  });

  // html
  return (
    <>
      <h2 className="d-flex justify-content-center mb-4">Seat reservation</h2>
      <ErrorAlert error={tablesError} />
      <ErrorAlert error={seatError} />
      <ErrorAlert error={reservationError} />

      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="col-6">
          <div className="form-group">
            <label htmlFor="table_id">Choose a table for a party of {reservation.people}</label>
            <select 
              className="form-control"
              name="table_id"
              id="table_id"
              onChange={handleChange}
            >
              <option>Select Table</option>
              {tableOptions}
            </select>
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

export default SeatReservation;