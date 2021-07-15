import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';

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
                <caption>Transactions on field</caption>
                {/* caption can be changed to an h4 once material is brought in */}
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
                                <Moment format="LLL">{event.timestamp}</Moment>
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
                                        <button onClick={() => deleteButton(event.field_transactions_ID)}>
                                            Delete
                                        </button>
                                    </td>}

                            </tr>
                        )
                    })}
                </tbody>
            </table>

            {user.farmer &&
                <Button onClick={() => history.push(`/add_transaction/${fieldID}`)}>
                    New Event
                </Button>}

        </center>
    )
}

export default ViewTransactions;
