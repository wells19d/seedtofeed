import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ViewTransactions(params) {

    const fieldID = params.fieldID;

    const history = useHistory();
    const dispatch = useDispatch();

    const transactions = useSelector(store => store.fieldTransactionsReducer);

    useEffect(() => {
        dispatch({
          type: 'FETCH_FIELD_TRANSACTIONS',
          payload: fieldID
        })
      }, [])

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            Timestamp
                        </th>
                        <th>
                            Field Status
                        </th>
                        <th>
                            Event
                        </th>
                        <th>
                            Notes
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(event => {
                        return (
                            <tr key={event.id}>
                                <th>
                                    {event.timestamp}
                                </th>
                                <th>
                                    {event.field_status}
                                </th>
                                <th>
                                    {event.name}
                                </th>
                                <th>
                                    {event.status_notes}
                                </th>
                                <th>
                                    MAKE BUTTONS HERE
                                </th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <button>
                New Event
            </button>
        </div>
    )
}

export default ViewTransactions;