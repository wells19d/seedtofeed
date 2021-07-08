import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function FieldNIR(params) {

    const fieldID = params.fieldID;

    const history = useHistory();
    const dispatch = useDispatch();

    const fieldNIR = useSelector(store => store.fieldNIRReducer);

    useEffect(() => {
        dispatch({
            type: 'FETCH_FIELD_NIR',
            payload: fieldID
        })
    }, [])

    return (
        <div>
            <table className="sampleTable">
                <thead>
                    <tr>
                        <th>
                            Date of NIR Test
                        </th>
                        <th>
                            Moisture Levels
                        </th>
                        <th>
                            Protein Levels
                        </th>
                        <th>
                            Oil Levels
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {fieldNIR.map(test => {
                        <tr key={test.id}>
                            <th>
                                {test.tested_at}
                            </th>
                            <th>
                                {test.moisture}
                            </th>
                            <th>
                                {test.protein}
                            </th>
                            <th>
                                {test.oil}
                            </th>
                        </tr>
                    })}
                </tbody>
            </table>

            <button>
                Add NIR Data
            </button>
        </div>
    )
}

export default FieldNIR;