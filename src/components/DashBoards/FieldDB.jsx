import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';

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


    return (
        <center>
            <table>
                <thead>
                    <th>Year</th>
                    <th>Location</th>
                    <th>Acres</th>
                    <th>Field Note(s)</th>
                    <th>Name</th>
                    <th>Image</th> {/* This will be moved into an image for later display */}
                    <th>Shape File</th> {/* How will this look? Is it a link? */}
                    <th>GMO</th>
                    <th>Crop ID</th> {/* Need to change the number to the name for display */}
                </thead>
                <tbody></tbody>
            </table>
        </center>
    );
}


export default FieldDB;