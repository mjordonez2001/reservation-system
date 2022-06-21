import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { createTable } from "../utils/api";

// form that creates a new reservation
function TableForm() {

  // initializes form data for the table state
  const initialFormData = {
    table_name: "",
    capacity: ""
  }
  const [tableData, setTableData] = useState({...initialFormData});
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  // updates tableData on change
  const handleChange = ({ target }) => {
    if (target.name === "capacity") {
      setTableData({
        ...tableData,
        [target.name]: Number(target.value)
      });
    } else {
      setTableData({
        ...tableData,
        [target.name]: target.value
      });
    }
  };

  // on form submittion, it creates a new table and then sends the user back to the dashboard
  async function handleSubmit(event) {
    event.preventDefault();
    const abortController = new AbortController();

    try {
      await createTable(tableData, abortController.signal);
      setTableData({...initialFormData});
      history.push(`/dashboard`);
    } catch (error) {
      setTablesError(error);
    }
  }

  // when the user hits cancel, it takes the back to the previous page
  const handleCancel = () => history.goBack();

  // html
  return (
    <>
      <ErrorAlert error={tablesError} />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="table_name">Table Name</label>
          <input 
            type="text"
            className="form-control"
            id="table_name"
            name="table_name"
            value={tableData.table_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input 
            type="number"
            className="form-control"
            id="capacity"
            name="capacity"
            value={tableData.capacity}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  )
}

export default TableForm;