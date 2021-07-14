import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function ViewTransactions(params) {
    const fieldID = params.fieldID;

    const transactions = useSelector(store => store.fieldTransactionsReducer);
    const user = useSelector((store) => store.user);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_FIELD_TRANSACTIONS',
            payload: fieldID,
        });
    }, []);

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
                            <tr key={event.field_transactions_ID}>
                                <td>
                                    {moment.utc(event.timestamp).format('LLL')}
                                </td>
                                <td>
                                    {event.field_status}
                                </td>
                                <td>
                                    {event.status_notes}
                                </td>

                                {user.farmer &&
                                    <td>
                                        <button onClick={() => history.push(`/edit_transaction/${fieldID}/${event.field_transactions_ID}`)}>
                                            Edit
                                        </button>
                                        <button onClick={() => deleteButton(event.id)}>
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
