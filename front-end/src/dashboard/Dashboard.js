import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
import { previous, next, today, formatDate } from "../utils/date-time";
import ReservationsTable from "./ReservationsTable";
import TablesTable from "./TablesTable";

// defines the dashboard page.
function Dashboard({ currentDate }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  // gets the date from the query. if there is no query, it defaults to the current date
  const query = useQuery().get("date");
  const date = query ? query : currentDate;
  const history = useHistory();

  // loads the dashboard according to the date
  useEffect(() => {
    const abortController = new AbortController();

    async function loadDashboard() {
      setReservationsError(null);
      setTablesError(null);

      // loads all reservations
      listReservations({ date }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsError);
        
      // loads all tables
      listTables(abortController.signal)
        .then(setTables)
        .catch(setTablesError);
    }
    
    loadDashboard();
    return () => abortController.abort();
  }, [date]);

  // handles all button clicks
  const handlePrev = () => history.push(`dashboard?date=${(previous(date))}`);
  const handleNext = () => history.push(`dashboard?date=${(next(date))}`);
  const handleToday = () => history.push(`dashboard?date=${(today())}`);

  // html
  return (
    <main className="container-fluid">
      <h1 className="d-flex justify-content-center">Dashboard</h1>

      <div className="mt-4">
        <h3>Reservations for {formatDate(date)}</h3>
      </div>

      <div className="btn-group mt-2 mb-4">
        <button type="button" className="btn btn-outline-primary" onClick={handlePrev}>Prev.</button>
        <button type="button" className="btn btn-outline-primary" onClick={handleToday}>Today</button>
        <button type="button" className="btn btn-outline-primary" onClick={handleNext}>Next</button>
      </div>

      <div className="mb-5">
        <ErrorAlert error={reservationsError} />
        {reservations.length  
          ? <ReservationsTable reservations={reservations} /> 
          : <h4 className="d-flex justify-content-center">No Reservations</h4>}
      </div>
      <div>
        <ErrorAlert error={tablesError} />
        {tables.length 
          ? <TablesTable tables={tables} /> 
          : <h4 className="d-flex justify-content-center">No Tables</h4>}
      </div>
      
    </main>
  );
}

export default Dashboard;
