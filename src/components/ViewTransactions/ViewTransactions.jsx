import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

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
                                <td>
                                    {moment(event.timestamp).format('MM-DD-YYYY hh:mm')}
                                </td>
                                <td>
                                    {event.field_status}
                                </td>
                                <td>
                                    {event.name}
                                </td>
                                <td>
                                    {event.status_notes}
                                </td>
                                <td>
                                    MAKE BUTTONS HERE
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <button onClick={() => history.push(`/add_transaction/${feildID}`)}>
                New Event
            </button>
        </center>
    )
}

export default ViewTransactions;