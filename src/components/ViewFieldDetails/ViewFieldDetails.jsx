import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// IMPORT THE 'FieldTransactions', 'FieldNIR', AND 'StatusTracker' COMPONENTS HERE

function ViewFieldDetails() {

    const params = useParams();

    const fieldID = params.fieldID;

    const [view, setView] = useState(true);

    return (
        <>
            <div>
                <StatusTracker fieldID={fieldID} />
            </div>

            <div>
                <span>View: </span>
                <select onChange = {(event) => setView(event.target.value)}>
                            <option value={true}>Transactions</option>
                            <option value={false}>NIR</option>
                </select>
            </div>

            {view ? <FieldTransactions fieldID={fieldID} /> : <FieldNIR fieldID={fieldID} />}
        </>
    )
}

export default ViewFieldDetails;