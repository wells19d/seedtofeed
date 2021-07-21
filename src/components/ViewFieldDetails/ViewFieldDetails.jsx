import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FieldNIR from '../NIR/FieldNIR.jsx';
import ViewTransactions from '../ViewTransactions/ViewTransactions.jsx';
import ViewContract from '../ViewContract/ViewContract';

import StatusTracker from '../StatusTracker/StatusTracker.jsx';
import { useDispatch } from 'react-redux';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const standardButtons = {
  border: 'solid black 0px',
  boxShadow: '2px 2px 3px 0px grey',
  minWidth: '1px',
};

function ViewFieldDetails() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: 'FETCH_FIELD_DETAILS',
      payload: fieldID,
    });
  }, []);

  const params = useParams();
  const fieldID = params.fieldID;

  return (
    <center>
      <Grid container spacing={2} display>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <StatusTracker fieldID={fieldID} />
        </Grid>
        <Grid item xs={1} />

        <Grid item xs={2} />
        <Grid item xs={8}>
          <ViewTransactions fieldID={fieldID} />
        </Grid>
        <Grid item xs={2} />

        <Grid item xs={2} />
        <Grid item xs={8}>
          <FieldNIR fieldID={fieldID} />
        </Grid>
        <Grid item xs={2} />
      </Grid>
      <br />
      <Button className="submit-buttons" onClick={() => history.goBack()}>
        ⬅ Go Back
      </Button>
    </center>
  );
}

export default ViewFieldDetails;
