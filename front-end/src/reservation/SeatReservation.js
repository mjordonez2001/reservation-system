import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables } from "../utils/api";
import { seatReservation } from "../utils/api";


function SeatReservation() {

  const [table_id, setTable_id] = useState("");
  const [tables, setTables] = useState([]);

  const [seatError, setSeatError] = useState(null);
  const [tablesError, setTablesError] = useState(null);

  const history = useHistory();
  const reservation_id = useParams().reservation_id;

  useEffect(() => {
    const abortController = new AbortController();

    async function loadTables() {
      setTablesError(null);

      listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError)
    }

    loadTables();
    return () => abortController.abort();
  }, [])

  // updates the table_id state on change
  const handleChange = ({ target }) => {
    setTable_id((currentTableId) => currentTableId = target.value);
  }

  // on form submittion, it updsates the table with the new reservation
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      await seatReservation(reservation_id, table_id, abortController.signal);
      history.push(`/dashboard`);
    } catch (error) {
      setSeatError(error);
    }
  }

  // when a user hits cancel, it takes them back to the previous page
  const handleCancel = () => history.goBack();

  // map the available tables to option tags for the select tag
  const tableOptions = tables.map((table, key) => {
    /*
    if (table.reservation_id) {
      return <></>;
    }
    */
    return <option value={table.table_id} key={key}>{table.table_name} - {table.capacity}</option>;
  });

  return (
    <>
      <ErrorAlert error={tablesError} />
      <ErrorAlert error={seatError} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="table_id">Choose Table</label>
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
        <div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  )
}

export default SeatReservation;