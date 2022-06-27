import React from "react";
import { clearTable } from "../utils/api";

// defines a single table as a table element
function Table({ table, setClearError}) {

  // prompts the user to confirm clearing the table
  async function handleFinish() {
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
      try {
        // clears the table, then reloads the page
        await clearTable(table.table_id);
        window.location.reload();
      } catch (error) {
        setClearError(error);
      }
    }
  }

  // finish button
  const finishButton = <button
    type="button" 
    className="btn btn-secondary" 
    data-table-id-finish={table.table_id}
    onClick={handleFinish}>
      Finish
    </button>

  // html
  return (
    <tr>
      <th scope="row" className="align-middle">{table.table_id}</th>
      <td className="align-middle">{table.table_name}</td>
      <td className="align-middle">{table.capacity}</td>
      <td className="align-middle" data-table-id-status={table.table_id}>{table.reservation_id ? <>Occupied</> : <>Free</>} </td>
      <td className="align-middle">{table.reservation_id ? finishButton : <></>}</td>
    </tr>
  )
}

export default Table;