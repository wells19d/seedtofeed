import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function ViewTransactions(params) {
  const fieldID = params.fieldID;

  const history = useHistory();
  const dispatch = useDispatch();

  const transactions = useSelector((store) => store.fieldTransactionsReducer);

  useEffect(() => {
    dispatch({
      type: 'FETCH_FIELD_TRANSACTIONS',
      payload: fieldID,
    });
  }, []);

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
    <center>
        <Grid container spacing={3}>
            <Grid item xs={1}/>
            <Grid item xs={10}>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Timestamp</TableCell>
              <TableCell>Field Status</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((event) => {
              return (
                <TableRow key={event.id}>
                  <TableCell>
                    {moment.utc(event.timestamp).format('LLL')}
                  </TableCell>
                  <TableCell>{event.field_status}</TableCell>
                  <TableCell>{event.image}</TableCell>
                  <TableCell>{event.status_notes}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        history.push(`/edit_transaction/${fieldID}/${event.id}`)
                      }
                    >
                      Edit
                    </Button>{' '}
                    /{' '}
                    <Button
                      color="secondary"
                      onClick={() => deleteButton(event.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      <Grid item xs={1}/>
      </Grid>
    </center>
  );
}

export default ViewTransactions;
