import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function AddTransaction() {

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const field_id = params.fieldID;

    const [notes, setNotes] = useState('');
    const [image, setImage] = useState('');
    const [fieldStatus, setFieldStatus] = useState('');
    const [transactionType, setTransactionType] = useState(1);

    useEffect(() => {
        dispatch({
          type: 'FETCH_TRANSACTION_TYPES'
        })
      }, []);

    const transactionList = useSelector(store => store.transactionTypesReducer);

    function submitButton(){
        event.preventDefault();

        dispatch({
            type: 'SET_TRANSACTION',
            payload: {
                field_id: fieldID,
                timestamp: new Date(),
                status_notes: notes,
                image: image,
                field_status: fieldStatus,
                transaction_type: transactionType
            }
        });

        history.push(`/field_details/${field_id}`);
    }


    return (
        <>
        <div>
      <form className='add-NIR' onSubmit={submitButton}>
        <h2>Transactions</h2>

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
          <label htmlFor='image'>
            Image URL:
            <input
              placeholder='Image URL'
              type='text'
              name='image'
              value={image}
            //   required
              onChange={(event) => setImage(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor='fieldStatus'>
            Field Status:
            <input
              placeholder='Field Status'
              type='text'
              name='fieldStatus'
              value={fieldStatus}
              required
              onChange={(event) => setFieldStatus(event.target.value)}
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
            value='Add NIR'
          />
        </div>
      </form>
    </div>

        </>
    )
}

export default AddTransaction;