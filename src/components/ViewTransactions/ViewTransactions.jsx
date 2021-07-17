import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const buttons = {
  background: '#fdb41b',
  padding: '3px 10px',
  boxShadow: '3px 3px 4px 0px black',
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
    <Typography><b>Field Transation:</b></Typography>
<Card>
      
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
          <span>July 17, 2021 {`\u00A0\u00A0`} - {`\u00A0\u00A0`} Pre-Planting {`\u00A0\u00A0`} - {`\u00A0\u00A0`} Cultivating {`\u00A0\u00A0`} - {`\u00A0\u00A0`} <Button
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
                    </Button></span>
          <br/>
          <br/>
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
