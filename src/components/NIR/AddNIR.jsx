import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Button, TextField } from '@material-ui/core/';

function AddNIR() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const field_id = params.fieldID;

  const tested_at = new Date();

  const transType = useSelector((store) => store.fieldTransactionsReducer);

  const fieldTrans = transType[0].transaction_type;

  const fieldStatus = transType[0].field_status;

  const [oil, setOil] = useState('');
  const [moisture, setMoisture] = useState('');
  const [protein, setProtein] = useState('');
  const [energy, setEnergy] = useState('');
  const [amino_acids, setAminoAcids] = useState('');

  function addNIR(event) {
    event.preventDefault();

    dispatch({
      type: 'ADD_NIR',
      payload: {
        field_id: field_id,
        oil: oil,
        moisture: moisture,
        protein: protein,
        energy: energy,
        amino_acids: amino_acids,
        fieldTrans: fieldTrans,
        fieldStatus: fieldStatus,
        tested_at: tested_at,
      },
    });

    history.push(`/field_details/${field_id}`);
  }

  return (
    <center>
      <Router>
        <h1>Add NIR Analysis</h1>
        <TextField
          variant="outlined"
          label="Oil Level"
          type="number"
          value={oil}
          InputProps={{ inputProps: { min: 0 } }}
          onChange={(event) => setOil(event.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          label="Moisture Level"
          type="number"
          value={moisture}
          InputProps={{ inputProps: { min: 0 } }}
          onChange={(event) => setMoisture(event.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          label="Protein Level"
          type="number"
          value={protein}
          InputProps={{ inputProps: { min: 0 } }}
          onChange={(event) => setProtein(event.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          label="Energy Level"
          type="number"
          value={energy}
          InputProps={{ inputProps: { min: 0 } }}
          onChange={(event) => setEnergy(event.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
        />
        <br />
        <br />
        <TextField
          variant="outlined"
          label="Amino Acid Level"
          type="number"
          value={amino_acids}
          InputProps={{ inputProps: { min: 0 } }}
          onChange={(event) => setAminoAcids(event.target.value)}
          required
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
        />
        <br />
        <br />
        <Button
          className="form-cancel"
          size="small"
          type="button"
          onClick={() => {
            window.location.reload();
          }}
        >
          Cancel
        </Button>
        {`\u00A0\u00A0\u00A0\u00A0`}
        <Button
          className="form-submit"
          size="small"
          type="submit"
          onClick={(event) => addNIR(event)}
        >
          Add NIR
        </Button>
      </Router>
    </center>
  );
}

export default AddNIR;
