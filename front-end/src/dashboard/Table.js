import React from "react";
import { clearTable } from "../utils/api";


function Table({ table, setClearError}) {

  // prompts the user to confirm clearing the table
  async function handleFinish() {
    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
      try {
        await clearTable(table.table_id);
        window.location.reload();
      } catch (error) {
        setClearError(error);
      }
    }
  }

  return (
    <tr>
      <th scope="row">{table.table_id}</th>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>{table.reservation_id ? <>Occupied</> : <>Free</>} </td>
      <td>
        <button
        type="button" 
        className="btn btn-secondary" 
        data-table-id-finish={table.table_id}
        onClick={handleFinish}>
          Finish
        </button>
      </td>
    </tr>
  )
}

export default Table;