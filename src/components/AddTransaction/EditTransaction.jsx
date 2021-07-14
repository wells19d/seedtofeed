import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

function EditTransaction() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const field_id = params.fieldID;

  const transaction_id = params.transactionID;

  useEffect(() => {
    dispatch({
      type: 'FETCH_TRANSACTION_TYPES',
    });
    dispatch({
      type: 'FETCH_FIELD_TRANSACTIONS',
      payload: field_id,
    });
  }, []);

  const transactionList = useSelector((store) => store.transactionTypesReducer);

  const transactions = useSelector((store) => store.fieldTransactionsReducer);

  const transaction_index = transactions.findIndex(
    (transaction) => transaction.id === Number(transaction_id)
  );
  const transaction_to_edit = transactions[transaction_index];
  //   const field_id = transaction_to_edit.field_id;

  const [notes, setNotes] = useState(transaction_to_edit?.status_notes); // Added the ? as it was coming in undefined
  const [image, setImage] = useState(transaction_to_edit?.image); // Added the ? as it was coming in undefined
  const [fieldStatus, setFieldStatus] = useState(
    transaction_to_edit?.field_status
  ); // Added the ? as it was coming in undefined
  const [transactionType, setTransactionType] = useState(
    transaction_to_edit?.transaction_type
  ); // Added the ? as it was coming in undefined

  function submitButton() {
    event.preventDefault();

    dispatch({
      type: 'UPDATE_TRANSACTION',
      payload: {
        field_id: fieldID,
        transaction_id: transaction_id,
        status_notes: notes,
        image: image,
        // field_status: fieldStatus,  // shouldn't this be transactionList[transactionType]???
        field_status: transactionList[transactionType],
        transaction_type: transactionType,
      },
    });

    history.push(`/field_details/${field_id}`);
  }

  return (
    <>
      <div>
        <form className="add-NIR" onSubmit={submitButton}>
          <h3>Edit Transaction</h3>

          <div>
            <label htmlFor="notes">
              Notes:
              <input
                placeholder="Notes"
                type="text"
                name="notes"
                value={notes}
                required
                onChange={(event) => setNotes(event.target.value)}
              />
            </label>
          </div>

          <div>
            <label htmlFor="image">
              Image URL:
              <input
                placeholder="Image URL"
                type="text"
                name="image"
                value={image}
                //   required
                onChange={(event) => setImage(event.target.value)}
              />
            </label>
          </div>

          {/* <div>
            <label htmlFor="fieldStatus">
              Field Status:
              <input
                placeholder="Field Status"
                type="text"
                name="fieldStatus"
                value={fieldStatus}
                required
                onChange={(event) => setFieldStatus(event.target.value)}
              />
            </label>
          </div> */}

          <div>
            <label htmlFor="transactionType">
              Transaction Type:
              <select
                autoFocus
                type="text"
                name="transactionType"
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
              className="btn"
              type="submit"
              name="submit"
              value="Add NIR"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default EditTransaction;
