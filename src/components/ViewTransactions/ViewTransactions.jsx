import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

function ViewTransactions(params) {

    const fieldID = params.fieldID;

    const history = useHistory();
    const dispatch = useDispatch();

    const transactions = useSelector(store => store.fieldTransactionsReducer);
    const user = useSelector((store) => store.user);

    useEffect(() => {
        dispatch({
          type: 'FETCH_FIELD_TRANSACTIONS',
          payload: fieldID
        })
      }, [])


    function deleteButton(transactionID){
        if (confirm('Do you wish to delete this transaction?')){
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: {
                    transactionID: transactionID,
                    fieldID: fieldID
                }
            })
        }
    }

    return (
        <center>
            <table className="sampleTable">
                <thead>
                    <tr>
                        <th>
                            Timestamp
                        </th>
                        <th>
                            Field Status
                        </th>
                        <th>
                            Image
                        </th>
                        <th>
                            Notes
                        </th>

                        {user.farmer && 
                        <th>
                            Actions
                        </th>}
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(event => {
                        return (
                            <tr key={event.id}>
                                <td>
                                    {moment(event.timestamp).format('MM-DD-YYYY hh:mm')}
                                </td>
                                <td>
                                    {event.field_status}
                                </td>
                                <td>
                                    {event.image}
                                </td>
                                <td>
                                    {event.status_notes}
                                </td>

                                {user.farmer &&
                                <td>
                                    <button onClick={()=> history.push(`/edit_transaction/${fieldID}/${event.id}`)}>
                                        Edit
                                    </button>
                                    <button onClick={()=> deleteButton(event.id)}>
                                        Delete
                                    </button>
                                </td>}
                                
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {user.farmer &&
            <button onClick={() => history.push(`/add_transaction/${fieldID}`)}>
                New Event
            </button>}

        </center>
    )
}

export default ViewTransactions;