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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const title = {
  fontFamily: 'Montserrat',
  fontStyle: 'italic',
  fontWeight: '600',
}

const buttons = {
  border: 'solid black 0px',
  background: '#fdb41b',
  padding: '3px 10px',
  boxShadow: '3px 3px 4px 0px grey',
};

const cards = {
  border: 'solid black 2px',
  fontFamily: 'Montserrat',
  overflow: 'auto',
  height: '500px',
  fontSize: '14px',
  boxShadow: '3px 3px 4px 1px grey',
};

const trashCan = <FontAwesomeIcon icon={faTrashAlt} />;
const edit = <FontAwesomeIcon icon={faEdit} />;

function ViewTransactions(params) {
  const fieldID = params.fieldID;

  const transactions = useSelector((store) => store.fieldTransactionsReducer);
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_FIELD_TRANSACTIONS',
      payload: fieldID,
    });
    dispatch({
      type: 'FETCH_FIELD_LIST',
    });
  }, []);

  console.log('Looking for the image', fieldID);

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

  return (
    <>
      <Typography style={title}>
        Field Transaction:
      </Typography>
      <Card style={cards}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="194"
            image="images/StraightSoybeans.jpeg"
            alt="Image of a field"
            title="Image of a field"
          />
        </CardActionArea>
        <CardContent>

          
          <Grid container spacing={0}>
            {/* Entry Start */}
            <Grid item xs={3} align="left">07/17/21 - 15:45</Grid>
            <Grid item xs={3} align="left">Elevator Transit</Grid>
            <Grid item xs={3} align="left">Delivery</Grid>
            <Grid item xs={3} align="left"><Button
              title="Edit"
              color="primary"
              onClick={() => history.push(`/edit_transaction/${fieldID}/${event.field_transactions_ID}`)}>
              {edit}
            </Button>
            <Button
              title="Delete"
              color="secondary"
              onClick={() => deleteButton(event.field_transactions_ID)}>
              {trashCan}
            </Button></Grid>
          {/* Entry End */}
            {/* Entry Start */}
            <Grid item xs={3} align="left">07/16/21 - 08:25</Grid>
            <Grid item xs={3} align="left">Harvest</Grid>
            <Grid item xs={3} align="left">Harvesting</Grid>
            <Grid item xs={3} align="left"><Button
              title="Edit"
              color="primary"
              onClick={() => history.push(`/edit_transaction/${fieldID}/${event.field_transactions_ID}`)}>
              {edit}
            </Button>
            <Button
              title="Delete"
              color="secondary"
              onClick={() => deleteButton(event.field_transactions_ID)}>
              {trashCan}
            </Button></Grid>
          {/* Entry End */}
            {/* Entry Start */}
            <Grid item xs={3} align="left">06/19/21 - 13:30</Grid>
            <Grid item xs={3} align="left">Application</Grid>
            <Grid item xs={3} align="left">Growing</Grid>
            <Grid item xs={3} align="left"><Button
              title="Edit"
              color="primary"
              onClick={() => history.push(`/edit_transaction/${fieldID}/${event.field_transactions_ID}`)}>
              {edit}
            </Button>
            <Button
              title="Delete"
              color="secondary"
              onClick={() => deleteButton(event.field_transactions_ID)}>
              {trashCan}
            </Button></Grid>
          {/* Entry End */}
            {/* Entry Start */}
            <Grid item xs={3} align="left">06/18/21 - 08:45</Grid>
            <Grid item xs={3} align="left">Application</Grid>
            <Grid item xs={3} align="left">Spraying</Grid>
            <Grid item xs={3} align="left"><Button
              title="Edit"
              color="primary"
              onClick={() => history.push(`/edit_transaction/${fieldID}/${event.field_transactions_ID}`)}>
              {edit}
            </Button>
            <Button
              title="Delete"
              color="secondary"
              onClick={() => deleteButton(event.field_transactions_ID)}>
              {trashCan}
            </Button></Grid>
          {/* Entry End */}
            {/* Entry Start */}
            <Grid item xs={3} align="left">06/17/21 - 16:15</Grid>
            <Grid item xs={3} align="left">Planting</Grid>
            <Grid item xs={3} align="left">Started Planting</Grid>
            <Grid item xs={3} align="left"><Button
              title="Edit"
              color="primary"
              onClick={() => history.push(`/edit_transaction/${fieldID}/${event.field_transactions_ID}`)}>
              {edit}
            </Button>
            <Button
              title="Delete"
              color="secondary"
              onClick={() => deleteButton(event.field_transactions_ID)}>
              {trashCan}
            </Button></Grid>
          {/* Entry End */}
          {/* Entry Start */}
            <Grid item xs={3} align="left">06/16/21 - 09:15</Grid>
            <Grid item xs={3} align="left">Pre-Planting</Grid>
            <Grid item xs={3} align="left">Cultivating</Grid>
            <Grid item xs={3} align="left"><Button
              title="Edit"
              color="primary"
              onClick={() => history.push(`/edit_transaction/${fieldID}/${event.field_transactions_ID}`)}>
              {edit}
            </Button>
            <Button
              title="Delete"
              color="secondary"
              onClick={() => deleteButton(event.field_transactions_ID)}>
              {trashCan}
            </Button></Grid>
          {/* Entry End */}
          {/* Entry Start */}
            <Grid item xs={3} align="left">06/15/21 - 08:00</Grid>
            <Grid item xs={3} align="left">Pre-Planting</Grid>
            <Grid item xs={3} align="left">Field Created</Grid>
            <Grid item xs={3} align="left"><Button
              title="Edit"
              color="primary"
              onClick={() => history.push(`/edit_transaction/${fieldID}/${event.field_transactions_ID}`)}>
              {edit}
            </Button>
            <Button
              title="Delete"
              color="secondary"
              onClick={() => deleteButton(event.field_transactions_ID)}>
              {trashCan}
            </Button></Grid>
          {/* Entry End */}
          
          </Grid>

          <br />
          <br />
          <Button style={buttons}>Add Transaction</Button>
        </CardContent>
      </Card>
    </>
  );
}

export default ViewTransactions;

/*










<center>
      <table className='sampleTable'>
        <caption>Transactions on field</caption>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Field Status</th>
            <th>Notes</th>

            {user.farmer && <th>Edit  Delete</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((event) => {
            return (
              <tr key={event.field_transactions_ID}>
                <td>
                  <Moment format='LLL'>{event.timestamp}</Moment>
                </td>
                <td>{event.field_status}</td>
                <td>{event.status_notes}</td>

                {user.farmer && (
                  <td>
                    <Button
                      title='Edit'
                      color='primary'
                      onClick={() =>
                        history.push(
                          `/edit_transaction/${fieldID}/${event.field_transactions_ID}`
                        )
                      }
                    >
                      {edit}
                    </Button>
                    <Button
                      title='Delete'
                      color='secondary'
                      onClick={() => deleteButton(event.field_transactions_ID)}
                    >
                      {trashCan}
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {user.farmer && (
        <Button onClick={() => history.push(`/add_transaction/${fieldID}`)}>
          New Transaction
        </Button>
      )}
    </center>

*/
