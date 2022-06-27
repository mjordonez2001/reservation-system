import React, { useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsTable from "../dashboard/ReservationsTable";

function Search() {

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [mobile_number, setMobile_number] = useState("");
  const [searchResults, setSearchResults] = useState(<></>);

  // updates the mobile number upon change
  const handleChange = ({ target }) => setMobile_number(target.value)

  // on form submittion, it loads the reservations based on the mobile number
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    async function loadTables() {
      setReservationsError(null);

      listReservations({ mobile_number }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
    }

    await loadTables();
    if (!reservations.length) setSearchResults(<h5>No reservations found</h5>)

    return () => abortController.abort();
  }

  return (
    <>
      <h2 className="d-flex justify-content-center mb-4">Search by phone number</h2>
      <ErrorAlert error={reservationsError} />

      <div className="d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="col-6">
          <div className="form-group">
            <label htmlFor="mobile_number">Enter a customer's phone number</label>
              <input 
                type="text"
                placeholder="###-###-####"
                className="form-control"
                id="mobile_number"
                name="mobile_number"
                value={mobile_number}
                onChange={handleChange}
              />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Find</button>
          </div>
        </form>
      </div>

      {reservations.length ? <ReservationsTable reservations={reservations} /> : searchResults}
    </>
  )
}

export default Search;