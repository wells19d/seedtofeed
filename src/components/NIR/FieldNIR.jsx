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

        <center>

            {JSON.stringify(fieldNIR)}

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
                        <th>
                            Energy
                        </th>
                        <th>
                            Amino Acids
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {fieldNIR.map(test => {
                        { console.log(test) }
                        return (
                        <tr key={test.id}>
                            <td>
                                {test.tested_at}
                            </td>
                            <td>
                                {test.moisture}
                            </td>
                            <td>
                                {test.protein}
                            </td>
                            <td>
                                {test.oil}
                            </td>
                            <td>
                                {test.energy}
                            </td>
                            <td>
                                {test.amino_acids}
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>

            <button onClick={() => history.push(`/NIR_form/${fieldID}`)}>
                Add NIR Data
            </button>
        </center>
    )
}

export default FieldNIR;