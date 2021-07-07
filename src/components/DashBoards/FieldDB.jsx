import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useReduxStore from '../../hooks/useReduxStore';
import { useSelector, useDispatch } from 'react-redux';

import '../App/App.css';

function FieldDB() {
    const dispatch = useDispatch();
    const store = useReduxStore(); // To grabb from the stored information to display fields to the DOM
    const history = useHistory();

    const entries = useSelector((store) => store.field); // Check if field is correct
    console.log('What do we get from entries?', entries);

    let params = useParams(); // To grab the params from the react router
    console.log('What do we get from params?', params);

    let id = params.id; // for setting up the use params

    // let entry = entries.find((entry) => entry.id === Number(id));
    // So we can hunt in the field to get us a number instead of a string for the id
    // console.log('What do we get for entry?', entry);

    // if(!entry) {
    //     // bail out if an entry isn't found
    //     return (
    //         <center><h2>Entry not found</h2></center>
    //     );
    // }

    useEffect(() => {
        dispatch({ type: 'GET_FIELD' });
      }, [dispatch]);


    return (
        <center>
            <table>
                <thead>
                    <tr>
                    <th>Year</th>
                    <th>Location</th>
                    <th>Acres</th>
                    <th>Field Note(s)</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Shape File</th>
                    <th>GMO</th>
                    <th>Crop ID</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {store.field.map((fieldEntry, index) => {
                        return (
                            <tr>
                                <td>{fieldEntry.id}</td>
                                <td>{fieldEntry.year}</td>
                                <td>{fieldEntry.acres}</td>
                                <td>{fieldEntry.field_note}</td>
                                <td>{fieldEntry.name}</td>
                                <td>{fieldEntry.image}</td>
                                <td>{fieldEntry.shape_file}</td>
                                <td>{fieldEntry.gmo}</td>
                                <td>{fieldEntrycrop_id}</td>
                                <td><button onClick={(event) => {updateButton(entry);}}>Edit</button></td>
                                <td><button onClick={(event) => {deleteButton(entry);}}>Delete</button></td>
                            </tr>
                        )
                    })} */}
                </tbody>
            </table>
        </center>
    );
}


export default FieldDB;