import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../App/App.css';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


function StatusTracker(params) {
  const fieldID = params.fieldID;

  const history = useHistory();
  const dispatch = useDispatch();

  const statuses = useSelector((store) => store.transactionTypesReducer);
  const details = useSelector((store) => store.fieldDetailsReducer);


  let detail = details[details.length - 1]; // This would get the latest entry in the store, assuming that the newest entry is also the newest date.
  //let detail = details[0];
  // console.log('here are the field details:', details);
  // console.log('What do we have here?', statuses);
  // console.log('What is the detail?', detail);

  // let detail;
  // function setDetail(){
  //   detail = details[0];
  //   for (i=1;i<details.length;i++){
  //     if (details[i].timestamp > detail.timestamp){ // This should check which Date is greater than the rest and will set detail to the object with the newest date.
  //       detail = details[i];
  //     }
  //   }
  // }



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
                <span className="Current_Status">
                  <img src={status.workflow_images} />
                </span>
              )}
            </div>
          );
        })}
        <h3>Contract Status: {detail?.contract_status_name}</h3>
    </center>
  );
}

export default StatusTracker;
