import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function EditTransaction() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const transaction_id = params.transactionID;

  useEffect(() => {
    dispatch({
      type: 'FETCH_TRANSACTION_TYPES',
    });
  }, []);

  const transactionList = useSelector((store) => store.transactionTypesReducer);

  const transactions = useSelector((store) => store.fieldTransactionsReducer);

  const transaction_index = transactions.findIndex(
    (transaction) => transaction.id === Number(transaction_id)
  );
  const transaction_to_edit = transactions[transaction_index];
  const field_id = transaction_to_edit.field_id;

  const [notes, setNotes] = useState(transaction_to_edit.status_notes);
  const [image, setImage] = useState(transaction_to_edit.image);
  const [fieldStatus, setFieldStatus] = useState(
    transaction_to_edit.field_status
  );
  const [transactionType, setTransactionType] = useState(
    transaction_to_edit.transaction_type
  );

  function submitButton() {
    event.preventDefault();

    dispatch({
      type: 'UPDATE_TRANSACTION',
      payload: {
        field_id: fieldID,
        transaction_id: transaction_id,
        status_notes: notes,
        image: image,
        field_status: fieldStatus,
        transaction_type: transactionType,
      },
    });

    history.push(`/field_details/${field_id}`);
  }

  return (
    <>
      <div>
        <form className="add-NIR" onSubmit={submitButton}>
          <h2>Edit Transaction</h2>

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

          <div>
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
          </div>

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
