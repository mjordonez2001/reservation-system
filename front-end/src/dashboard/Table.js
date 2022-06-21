import React from "react";

function Table({ table }) {
  return (
    <tr>
      <th scope="row">{table.table_id}</th>
      <td>{table.table_name}</td>
      <td>{table.capacity}</td>
      <td data-table-id-status={table.table_id}>{table.reservation_id ? <>Occupied</> : <>Free</>} </td>
    </tr>
  )
}

export default Table;