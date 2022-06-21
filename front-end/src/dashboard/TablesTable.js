import React from "react";
import Table from "./Table";

function TablesTable({ tables }) {
  const allTables = tables.map((table, key) => {
    return <Table table={table} key={key} />
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Table Name</th>
          <th scope="col">Capacity</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody className="table-group-divider">
        {allTables}
      </tbody>
    </table>
  )
  
}

export default TablesTable;