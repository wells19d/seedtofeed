import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';

import AddTransaction from '../AddTransaction/AddTransaction';

import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Popover,
} from '@material-ui/core';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import '../../index.css';

const trashCan = <FontAwesomeIcon icon={faTrashAlt} />;
const edit = <FontAwesomeIcon icon={faEdit} />;

function ViewTransactions(params) {
  const fieldID = params.fieldID;

  // -- Add Transaction Popup
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const transactions = useSelector((store) => store.fieldTransactionsReducer);
  const user = useSelector((store) => store.user);
  const history = useHistory();
  const dispatch = useDispatch();

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
    <center>
      <Typography className="card-header">Field Transaction:</Typography>
      <Card className="cards">
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
                <div className="field-header">
                  <u>Date - Time</u>
                </div>
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

            {user.farmer && (
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
            )}

            {user.buyer && <Grid item xs={2} align="center"></Grid>}

            <br />
            <br />
            {transactions.map((event) => {
              return (
                <>
                  <Grid
                    item
                    xs={2}
                    key={event.field_transactions_ID}
                    align="left"
                  >
                    <Moment format="lll">{event.timestamp}</Moment>
                  </Grid>
                  <Grid item xs={2} align="left" className="capitalize">
                    {event.field_status}
                  </Grid>
                  <Grid item xs={5} align="left" className="capitalize">
                    {event.status_notes}
                  </Grid>

                  {user.farmer && (
                    <Grid item xs={2} align="center">
                      <Button
                        className="standard-buttons"
                        title="Edit"
                        color="default"
                        onClick={() =>
                          history.push(
                            `/edit_transaction/${fieldID}/${event.field_transactions_ID}`
                          )
                        }
                      >
                        {edit}
                      </Button>
                      {`\u00A0\u00A0\u00A0\u00A0\u00A0`}
                      <Button
                        className="standard-buttons"
                        title="Delete"
                        color="default"
                        onClick={() =>
                          deleteButton(event.field_transactions_ID)
                        }
                      >
                        {trashCan}
                      </Button>
                    </Grid>
                  )}

                  {user.buyer && <Grid item xs={2} align="center"></Grid>}
                </>
              );
            })}
          </Grid>
          <br />
          <br />
          {user.farmer && (
            <>
              <Button className="submit-buttons" onClick={handleClick}>
                Add Transaction
              </Button>
            </>
          )}
        </CardContent>
      </Card>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Typography>
          <Card className="popup-cards">
            <AddTransaction />
          </Card>
        </Typography>
      </Popover>
    </center>
  );
}

export default ViewTransactions;
