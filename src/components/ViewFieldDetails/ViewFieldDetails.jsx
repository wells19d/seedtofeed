import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import FieldNIR from '../FieldNIR/FieldNIR.jsx';
import ViewTransactions from '../ViewTransactions/ViewTransactions.jsx';

import StatusTracker from '../StatusTracker/StatusTracker.jsx';
// NEED TO CREATE AND IMPORT STATUSTRACKER COMPONENT

function ViewFieldDetails() {

    const params = useParams();

    const fieldID = params.fieldID;

    const [view, setView] = useState("true");

    return (
        <>
            <div>
                <StatusTracker fieldID={fieldID} />
                {/* INSERT TRACKER HERE */}
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