import React, { useState, useEffect } from 'react';
import { HashRouter as Router} from 'react-router-dom';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function EditNIR() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const fieldNIR = useSelector((store) => store.fieldNIRReducer);

  const NIRID = params.NIRID;
  const field_id = params.fieldID;

  console.log(params);

  useEffect(() => {
    dispatch({
        type: 'FETCH_FIELD_NIR',
        payload: field_id
    })
}, [])

  const NIR_index = fieldNIR.findIndex((NIR) => NIR.id === Number(NIRID));
  const NIR_to_edit = fieldNIR[NIR_index];
  // const field_id = NIR_to_edit.field_id;

  const [oil, setOil] = useState(NIR_to_edit.oil);
  const [moisture, setMoisture] = useState(NIR_to_edit.moisture);
  const [protein, setProtein] = useState(NIR_to_edit.protein);
  const [energy, setEnergy] = useState(NIR_to_edit.energy);
  const [amino_acids, setAminoAcids] = useState(NIR_to_edit.amino_acids);

  function button() {
    event.preventDefault();

    dispatch({
      type: 'UPDATE_NIR',
      payload: {
        field_id: field_id,
        NIRID: NIRID,
        oil: oil,
        moisture: moisture,
        protein: protein,
        energy: energy,
        amino_acids: amino_acids,
      },
    });

    history.push(`/field_details/${field_id}`);
  }

  return (
    <Router>
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
        />
        <br />
        <br />
        <Button size="small"
          type="button"
          onClick={() => {
            history.push(`/field_details/${field_id}`);
          }}
        >Cancel</Button>{`\u00A0\u00A0\u00A0\u00A0`}
        <Button size="small"
        type="submit"
        onClick={(event) => addNIR(event)}>Update</Button>
      </Router>
  );
}

export default EditNIR;
