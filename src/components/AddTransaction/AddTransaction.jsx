import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

function AddTransaction() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const field_id = params.fieldID;

  const [notes, setNotes] = useState('');
  const [transactionType, setTransactionType] = useState(1);

  const transactionList = useSelector((store) => store.transactionTypesReducer);

  function submitButton() {
    event.preventDefault();

    if (notes.length === 0) {
      return alert('Fill in required fields');
    } else {
      dispatch({
        type: 'SET_TRANSACTION',
        payload: {
          field_id: field_id,
          status_notes: notes,
          transaction_type: transactionType,
        },
      });

      history.push(`/field_details/${field_id}`);
    }
  }

  useEffect(() => {
    dispatch({
      type: 'FETCH_TRANSACTION_TYPES',
    });
  }, []);

  return (
    <center>
      <Router>
        <h1>Add New Transaction</h1>
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
          onClick={() => {
            window.location.reload();
          }}
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
      </Router>
    </center>
  );
}

export default AddTransaction;
