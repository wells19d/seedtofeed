import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';

import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';

import '../../../src/index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const title = {
  fontFamily: 'Montserrat',
  fontStyle: 'italic',
  fontWeight: '600',
};

const submitButton = {
  border: 'solid black 0px',
  background: '#fdb41b',
  padding: '3px 10px',
  boxShadow: '3px 3px 4px 0px grey',
};

const standardButtons = {
  border: 'solid black 0px',
  boxShadow: '2px 2px 3px 0px grey',
  minWidth: '1px',
};

const cards = {
  border: 'solid black 2px',
  fontFamily: 'Montserrat',
  overflow: 'auto',
  fontSize: '14px',
  boxShadow: '3px 3px 4px 1px grey',
};

import '../../index.css';

const trashCan = <FontAwesomeIcon icon={faTrashAlt} />;
const edit = <FontAwesomeIcon icon={faEdit} />;

function ViewTransactions(params) {
  const fieldID = params.fieldID;

  const transactions = useSelector((store) => store.fieldTransactionsReducer);
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();

  console.log('Looking for the image', transactions[0]?.field_image);

  function deleteButton(transactionID) {
    if (confirm('Do you wish to delete this transaction?')) {
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: {
          transactionID: transactionID,
          fieldID: fieldID,
        },
      });
    }
  }

  useEffect(() => {
    dispatch({
      type: 'FETCH_FIELD_TRANSACTIONS',
      payload: fieldID,
    });
    dispatch({
      type: 'FETCH_FIELD_LIST',
    });
  }, []);

  return (
    <>
      <Typography className='card-header'>Field Transaction:</Typography>
      <Card className='cards'>
        <CardActionArea>
          <CardMedia
            component="img"
            height="194"
            image={transactions[0]?.field_image}
            alt="Image of a field"
            title="Image of a field"
          />
        </CardActionArea>
        <CardContent>
          <Grid container spacing={1}>
            <Grid item xs={2} align="left">
              <b>
                <div className="field-header"><u>Date - Time</u></div>
              </b>
            </Grid>
            <Grid item xs={2} align="left">
              <b>
                <u>Field Status</u>
              </b>
            </Grid>
            <Grid item xs={5} align="left">
              <b>
                <u>Notes</u>
              </b>
            </Grid>
            <Grid item xs={2} align="center">
              {`\u00A0\u00A0\u00A0`}
              <b>
                <u>Edit</u>
              </b>
              {`\u00A0\u00A0\u00A0`}
              <b>
                <u>Delete</u>
              </b>
            </Grid>
            <br />
            <br />
            {transactions.map((event) => {
              return (
                <>
                  <Grid item xs={2} key={event.field_transactions_ID} align="left" ><Moment format="lll">{event.timestamp}</Moment></Grid>
                  <Grid item xs={2} align="left" className='capitalize'>{event.field_status}</Grid>
                  <Grid item xs={5} align="left" className='capitalize'>{event.status_notes}</Grid>
                  <Grid item xs={2} align="center">
                    <Button  className='standard-buttons' title="Edit" color="default" onClick={() => history.push(`/edit_transaction/${fieldID}/${event.field_transactions_ID}`)}>{edit}</Button>
                    {`\u00A0\u00A0\u00A0\u00A0\u00A0`}
                    <Button  className='standard-buttons' title="Delete" color="default" onClick={() => deleteButton(event.field_transactions_ID)}>{trashCan}</Button>
                  </Grid>
                </>
              );
            })}
          </Grid>
          <br />
          <br />
          {user.farmer && (
            <Button className='submit-buttons' onClick={() => history.push(`/add_transaction/${fieldID}`)}>New Transaction</Button>
          )}
        </CardContent>
      </Card>
    </>
  );
}

export default ViewTransactions;
