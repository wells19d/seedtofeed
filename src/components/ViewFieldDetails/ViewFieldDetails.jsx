import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FieldNIR from '../NIR/FieldNIR.jsx';
import ViewTransactions from '../ViewTransactions/ViewTransactions.jsx';


import StatusTracker from '../StatusTracker/StatusTracker.jsx';
import { useDispatch } from 'react-redux';
// NEED TO CREATE AND IMPORT STATUSTRACKER COMPONENT

function ViewFieldDetails() {

 const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ 
        type: 'FETCH_FIELD_DETAILS',
        payload: fieldID});
  }, []);

    const params = useParams();

    const fieldID = params.fieldID;

    const [view, setView] = useState("true");

    return (
        <>
            <div>
                <StatusTracker fieldID={fieldID} />
            </div>

            <div>
                <span>View: </span>
                <select onChange={(event) => setView(event.target.value)}>
                    <option value={true}>Transactions</option>
                    <option value={false}>NIR</option>
                </select>
            </div>

            {view === "true" && <ViewTransactions fieldID={fieldID} />}
            {view === "false" && <FieldNIR fieldID={fieldID} />}
        </>
    )
}

export default ViewFieldDetails;