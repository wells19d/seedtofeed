import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FieldNIR from '../NIR/FieldNIR.jsx';
import ViewTransactions from '../ViewTransactions/ViewTransactions.jsx';

import StatusTracker from '../StatusTracker/StatusTracker.jsx';
import { useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';

// NEED TO CREATE AND IMPORT STATUSTRACKER COMPONENT

function ViewFieldDetails() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: 'FETCH_FIELD_DETAILS',
      payload: fieldID
    });
  }, []);

  const params = useParams();
  const fieldID = params.fieldID;

  const [view, setView] = useState('true');

  return (
    <center>
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
      <br />
      {view === 'true' && <ViewTransactions fieldID={fieldID} />}
      {view === 'false' && <FieldNIR fieldID={fieldID} />}
      <br/>
      <div className='back-button'>
        <Button onClick={() => history.goBack()}>⬅ Go Back</Button>
      </div>
    </center>
  );
}

export default ViewFieldDetails;
