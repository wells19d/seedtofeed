import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../App/App.css';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


function StatusTracker(params) {
  const fieldID = Number(params.fieldID);

  const history = useHistory();
  const dispatch = useDispatch();

  const statuses = useSelector((store) => store.transactionTypesReducer);
  const details = useSelector((store) => store.fieldDetailsReducer);


  let detail = details[details.length - 1]; 

  useEffect(() => {
    dispatch({
      type: 'FETCH_FIELD_DETAILS',
      payload: fieldID,
    });

    dispatch({
      type: 'FETCH_TRANSACTION_TYPES',
    });
  }, []);

  // console.log('What is the fieldID', fieldID);

  return (
    <center>
      <h1><u>{detail?.field_name}</u></h1>
      <br />
      {statuses.map((status) => {
        return (
          <div key={status.id}>
            {status.name === detail?.field_status && (
              <div className="Current_Status">
                <img src={status.workflow_images} />
              </div>
            )}
          </div>
        );
      })}
      <h3>Contract Status: {detail?.contract_status_name}</h3>
    </center>
  );
}

export default StatusTracker;
