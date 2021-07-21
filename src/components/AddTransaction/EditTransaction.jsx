import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Button,
  Card,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

import '../../index.css';

function EditTransaction() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const field_id = params.fieldID;
  const transaction_id = params.transactionID;

  const transactionList = useSelector((store) => store.transactionTypesReducer);
  const transactions = useSelector((store) => store.fieldTransactionsReducer);

  const transaction_index = transactions.findIndex(
    (transaction) =>
      transaction.field_transactions_ID === Number(transaction_id)
  );
  const transaction_to_edit = transactions[transaction_index];

  const [notes, setNotes] = useState(transaction_to_edit?.status_notes);
  const [transactionType, setTransactionType] = useState(
    transaction_to_edit?.transaction_type
  );

  function submitButton() {
    event.preventDefault();

    if (notes.length === 0) {
      return alert('Fill in required fields');
    } else {
      dispatch({
        type: 'UPDATE_TRANSACTION',
        payload: {
          field_id: field_id,
          transaction_id: transaction_id,
          status_notes: notes,
          transaction_type: transactionType
        },
      });

      history.push(`/field_details/${field_id}`);
    }
  }
  

  useEffect(() => {
    dispatch({
      type: 'FETCH_TRANSACTION_TYPES',
    });
    dispatch({
      type: 'FETCH_FIELD_TRANSACTIONS',
      payload: field_id,
    });
  }, []);

  return (
    <>
      <Router>
          
      </Router>
    </>
  );
}

export default EditTransaction;


/*

<center>
            <Card className="cards card-width">
              <h1>Edit Transaction</h1>
              <TextField
                variant="outlined"
                label="Notes"
                type="text"
                value={notes}
                required
                onChange={(event) => setNotes(event.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                size="small"
              />
              <br />
              <br />
              <FormControl size="small">
                <Select
                  variant="outlined"
                  value={transactionType}
                  required
                  style={{ width: '155px' }}
                  onChange={(event) => setTransactionType(event.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled size="small">
                    <em>Transaction Type</em>
                  </MenuItem>
                  {transactionList?.map((transaction) => {
                    return (
                      <MenuItem key={transaction.id} value={transaction.id}>
                        {transaction.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <br />
              <br />
              <Button
                className="form-cancel"
                size="small"
                onClick={() => history.push(`/field_details/${field_id}`)}
              >
                Cancel
              </Button>
              {`\u00A0\u00A0\u00A0\u00A0`}
              <Button
                className="form-submit"
                size="small"
                onClick={(event) => submitButton(event)}
              >
                Submit
              </Button>
            </Card>
            <br />
            <Button className="submit-buttons" onClick={() => history.goBack()}>
              ⬅ Go Back
            </Button>
          </center>

*/