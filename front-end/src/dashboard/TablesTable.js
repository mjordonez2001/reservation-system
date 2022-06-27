import React, { useState } from "react";
import Table from "./Table";
import ErrorAlert from "../layout/ErrorAlert";

// defines the table that contains all tables
function TablesTable({ tables }) {
  const [clearError, setClearError] = useState(null);

  // maps all tables to the Table component
  const allTables = tables.map((table) => {
    return <Table table={table} key={table.table_id} setClearError={setClearError}/>
  });

  // html
  return (
    <>
      <ErrorAlert error={clearError} />
      <h4 className="d-flex justify-content-center">Tables</h4>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr className="table-primary">
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
      </div>
      
    </>
  )
  
}

export default TablesTable;