import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import '../App/App.css';

function ViewFields(params) {
  const dispatch = useDispatch();
  const history = useHistory();

  const fieldList = useSelector((store) => store.fieldListReducer);
  console.log('The fieldList', fieldList);

  const userID = params.userID;

  useEffect(() => {
    dispatch({
      type: 'FETCH_FIELD_LIST',
      payload: userID,
    });
  }, []);

  function deleteButton(fieldID) {
    dispatch({
      type: 'DELETE_FIELD',
      payload: fieldID,
    });
  }

  return (
    <center>
      <table className="sampleTable">
        <thead>
          <tr>
            <th>Fields</th>
            <th>Field Status</th>

            <th>Field Notes</th>
            <th>Buyer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fieldList.map((field) => {
            return (
              <tr key={field.id}>
                <td>
                    <button onClick={() => history.push(`/field_details/${field.id}`)}>
                    {field.name}
                    <br />
                    {field.location}
                  </button>
                </td>
                <td>{field.field_status}</td>
                <td>{field.field_note}</td>
                <td>LIST BUYER HERE</td>
                <td>
                  {/* <button onClick={() => history.push(`/edit_field/${field.id}`)}> */}
                  <button onClick={() => history.push(`/edit_field/${field.id}`)} >
                    Edit
                  </button>
                  <button onClick={() => deleteButton(field.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button onClick={() => history.push(`/add_field/`)}>Add new Field</button>
    </center>
  );
}

export default ViewFields;
