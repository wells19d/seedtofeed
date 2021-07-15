import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../App/App.css';

function StatusTracker(params) {
  const fieldID = params.fieldID;

  const history = useHistory();
  const dispatch = useDispatch();

  const statuses = useSelector((store) => store.transactionTypesReducer);
  const details = useSelector((store) => store.fieldDetailsReducer);


  let detail = details[details.length - 1]; // This would get the latest entry in the store, assuming that the newest entry is also the newest date.
  //let detail = details[0];
  console.log('here are the field details:', detail);

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

  return (
    <>
      <div>
        {/* <h2>Status Tracker</h2> */}
        <h1>Status of {detail?.field_name}</h1>
        <br />
      </div>
      <div>
        {statuses.map((status) => {
          //setDetail(); // This calls the function to set detail to the object with the newest date.
          console.log('the status name is', status.name);
          console.log('the field status is', detail?.field_status);
          console.log('the image is', status.workflow_images);
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

        <h4>Transactions and NIR are in the dropdown menu.</h4>
        <p>Contract Status: {detail?.contract_status_name}</p> {/* This should be detail.contract_status_name but errors out on refresh */}
      </div>
    </>
  );
}

export default StatusTracker;
