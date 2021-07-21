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

  const entries = useSelector((store) => store.field);

  let params = useParams();

  let id = params.id;

  return (
    <center>
      <table>
        <thead>
          <th>Year</th>
          <th>Location</th>
          <th>Acres</th>
          <th>Field Note(s)</th>
          <th>Name</th>
          <th>Image</th>{' '}
          {/* This will be moved into an image for later display */}
          <th>Shape File</th>
          <th>GMO</th>
          <th>Crop ID</th>{' '}
          {/* Need to change the number to the name for display */}
        </thead>
        <tbody></tbody>
      </table>
    </center>
  );
}

export default FieldDB;
