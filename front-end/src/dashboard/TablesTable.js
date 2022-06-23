import React, { useState } from "react";
import Table from "./Table";
import ErrorAlert from "../layout/ErrorAlert";

function TablesTable({ tables }) {
  const [clearError, setClearError] = useState(null);

  const allTables = tables.map((table) => {
    return <Table table={table} key={table.table_id} setClearError={setClearError}/>
  });

  return (
    <>
      <ErrorAlert error={clearError} />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Table Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {allTables}
        </tbody>
      </table>
    </>
  )
  
}

export default TablesTable;