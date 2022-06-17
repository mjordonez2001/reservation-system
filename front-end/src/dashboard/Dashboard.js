import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { previous, next, today } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ currentDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  const query = useQuery().get("date");
  const date = query ? query : currentDate;
  const history = useHistory();

  // loads the dashboard according to the date
  useEffect(() => {
    const abortController = new AbortController();

    async function loadDashboard() {
      setReservationsError(null);
      listReservations({ date }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
    }
    
    loadDashboard();
    return () => abortController.abort();
  }, [date]);

  // handles all button clicks
  const handlePrev = () => history.push(`dashboard?date=${(previous(date))}`);
  const handleNext = () => history.push(`dashboard?date=${(next(date))}`);
  const handleToday = () => history.push(`dashboard?date=${(today())}`);

  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={reservationsError} />
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date {date}</h4>
      </div>
      <div className="btn-group">
        <button type="button" className="btn btn-outline-primary" onClick={handlePrev}>Prev.</button>
        <button type="button" className="btn btn-outline-primary" onClick={handleToday}>Today</button>
        <button type="button" className="btn btn-outline-primary" onClick={handleNext}>Next</button>
      </div>
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
