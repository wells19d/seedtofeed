import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ViewFields() {

    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    const fieldList = useSelector(store => store.fieldListReducer);

    const userID = params.userID;

    useEffect(() => {
        dispatch({
          type: 'FETCH_FIELD_LIST',
          payload: userID
        })
      }, [])

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>
                            Fields
                        </th>
                        <th>
                            Field Status
                        </th>
                        <th>
                            Field Notes
                        </th>
                        <th>
                            Buyer
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {fieldList.map(field => {
                        return (
                            <tr key={field.id}>
                                <th>
                                    {field.name}
                                    {field.location}
                                </th>
                                <th>
                                    FIELD STATUS
                                </th>
                                <th>
                                    {field.field_notes}
                                </th>
                                <th>
                                    LIST BUYER HERE
                                </th>
                                <th>
                                    BUTTONS HERE
                                </th>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <button>
                Add new Field
            </button>
        </>
    )
}

export default ViewFields;