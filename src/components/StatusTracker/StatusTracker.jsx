import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../App/App.css';

import { Card, Grid, Paper } from '@material-ui/core';

import '../../../src/index.css';


function StatusTracker(params) {
  const fieldID = Number(params.fieldID);
  const user = useSelector((store) => store.user);

  const history = useHistory();
  const dispatch = useDispatch();

  const statuses = useSelector((store) => store.transactionTypesReducer);
  const details = useSelector((store) => store.fieldDetailsReducer);
  const contracts = useSelector((store) => store.contractListReducer);

  const fields = useSelector((store) => store.fieldListReducer);

  let field = fields[0];

  console.log('the field is', field);

  const transactions = useSelector((store) => store.fieldTransactionsReducer);
  console.log('the transactions for statusTracker', transactions);


  //let detail = details[details.length - 1]; // This would get the latest entry in the store, assuming that the newest entry is also the newest date.
  let detail = details[0]; // This gets the first entry in the store, assuming that the order has the newest in the first spot.
  const userContract = contracts?.filter((contract) => (contract.userID === user.id) && contract.fieldID === fieldID);
  const currentTransaction = transactions[0]; //the fieldTransaction endpoin is sorted in DESC order by timestamp





  useEffect(() => {
    dispatch({
      type: 'FETCH_FIELD_DETAILS',
      payload: fieldID,
    });

    dispatch({
      type: 'FETCH_TRANSACTION_TYPES',
    });

    dispatch({
      type: 'FETCH_CONTRACT_LIST',
    })

    dispatch({
      type: 'FETCH_FIELD_TRANSACTIONS',
      payload: fieldID

    })
  }, []);

  // console.log('What is the fieldID', fieldID);

  return (
    <center>
      {/* {JSON.stringify(details)} */}

      <h1>Dashboard</h1>
      <Card className="status-tracker">
        <br />
        <Grid container spacing={0}>
          <Grid item xs={3}><b>Field Name: {detail?.field_name}</b></Grid>
          <Grid item xs={3}><b>Location: {field?.location}</b></Grid>
          <Grid item xs={3}><b>Crop Type: {detail?.crop_type}</b></Grid>
          <Grid item xs={3}><b>Acres: {field?.acres}</b></Grid>


          {userContract?.length >= 1 && <>
            <Grid item xs={3}><b>Contract Number: {userContract[0]?.bushel_uid}</b></Grid>
            <Grid item xs={3}><b>Contract Status: {userContract[0]?.name}</b></Grid>
          </>}
        </Grid>
        <br />
        {statuses.map((status) => {
          return (
            <div key={status.id}>
              {status.name === currentTransaction?.field_status && (
                <div className="Current_Status">
                  <img src={status.workflow_images} />
                </div>
              )}
            </div>
          );
        })}
      </Card>
      <br />
    </center>
  );
}

export default StatusTracker;
