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

  useEffect(() => {
    dispatch({
      type: 'FETCH_TRANSACTION_TYPES'
    });
  }, []);

  const transactionList = useSelector((store) => store.transactionTypesReducer);

  function submitButton() {
    event.preventDefault();

    dispatch({
      type: 'SET_TRANSACTION',
      payload: {
        field_id: field_id,
        timestamp: new Date(),
        status_notes: notes,
        field_status: transactionList[transactionType]?.name,
        transaction_type: transactionType
      }
    });

    history.push(`/field_details/${field_id}`);
  }

  return (
    <>
      <div>
        <form className='add-NIR' onSubmit={submitButton}>
          <h1>Add New Transaction</h1>
          <div>
            <label htmlFor='notes'>
              Notes:
              <input
                placeholder='Notes'
                type='text'
                name='notes'
                value={notes}
                required
                onChange={(event) => setNotes(event.target.value)}
              />
            </label>
          </div>

          <div>
            <label htmlFor='transactionType'>
              Transaction Type:
              <select
                autoFocus
                type='text'
                name='transactionType'
                value={transactionType}
                required
                onChange={(event) => setTransactionType(event.target.value)}
              >
                <option>Select</option>
                {transactionList?.map((transaction) => {
                  console.log('transaction type:', transaction);
                  return (
                    <option key={transaction.id} value={transaction.id}>
                      {transaction.name}
                    </option>
                  );
                })}
              </select>
            </label>
          </div>

          <div>
            <input
              className='btn'
              type='submit'
              name='submit'
              value='Add Transaction'
            />
          </div>
        </form>
        <div className='back-button'>
          <Button onClick={() => history.goBack()}>⬅ Go Back</Button>
        </div>
      </div>
    </>
  );
}

export default AddTransaction;
