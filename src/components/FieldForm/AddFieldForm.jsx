import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function AddFieldForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const CHARACTER_LIMIT = 500;

  // LOCAL STATE
  const [fieldName, setFieldName] = useState('');
  const [fieldYear, setFieldYear] = useState('');
  const [cropType, setCropType] = useState('');
  const [location, setLocation] = useState('');
  const [acres, setAcres] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [notes, setNotes] = useState('');

  const crops = useSelector((store) => store.cropListReducer);
  const fieldStatus = useSelector((store) => store.transactionTypesReducer);
  console.log('here is the list of crops:', crops);
  console.log('here is the field status list:', fieldStatus);

  useEffect(() => {
    dispatch({
      type: 'FETCH_TRANSACTION_TYPES',
    });
    dispatch({
      type: 'FETCH_CROP_LIST',
    });
  }, []);

  // ADD A FIELD
  const addField = (event) => {
    event.preventDefault();
    history.push('/user'); // Sends user back to the main page

    dispatch({
      type: 'SET_FIELD', // Need to double check this is the right dispatch type name in saga
      payload: {
        name: fieldName,
        year: fieldYear,
        crop_id: cropType,
        location: location,
        acres: acres,
        current_status: currentStatus,
        field_note: notes,
      },
    });
  };

  return (
    <Router>
      <Grid container spacing={2}>
        <Grid item xs={3} />
        <Grid item xs={2}>
          <TextField
            variant="outlined"
            label="Field Name"
            type="text"
            value={fieldName}
            onChange={(event) => setFieldName(event.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            variant="outlined"
            label="Location"
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          ></TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            variant="outlined"
            label="Number of Acres"
            type="number"
            value={acres}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={(event) => setAcres(event.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          ></TextField>
        </Grid>
        <Grid item xs={3} />

        <Grid item xs={3} />
        <Grid item xs={2}>
          <TextField
            variant="outlined"
            label="Year"
            type="number"
            value={fieldYear}
            InputProps={{ inputProps: { min: 1900 } }}
            onChange={(event) => setFieldYear(event.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Select
            variant="outlined"
            value={cropType}
            style={{ width: '155px' }}
            onChange={(event) => setCropType(event.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>Crop Type</em>
            </MenuItem>
            {crops?.map((crop) => {
              return (
                <MenuItem key={crop.id} value={crop.id}>
                  {crop.crop_type}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs={2}>
          <Select
            variant="outlined"
            value={currentStatus}
            style={{ width: '155px' }}
            onChange={(event) => setCurrentStatus(event.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              <em>Current Status</em>
            </MenuItem>
            {fieldStatus?.map((status) => {
              console.log(`field status`, status.name);
              return (
                <MenuItem key={status.id} value={status.id}>
                  {status.name}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs={3} />

        <Grid item xs={3} />
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Field Notes"
            type="text"
            value={notes}
            style={{ minWidth: '500px' }}
            helperText={`${notes.length}/${CHARACTER_LIMIT}`}
            onChange={(event) => setNotes(event.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={3} />

        <Grid item xs={3} />
        <Grid item xs={6}>
          <center>
            <Button
              type="button"
              className="btn btn_asCancel"
              onClick={() => {
                history.push('/user'); // Sends user back to the main page
              }}
            >
              Cancel
            </Button>
            {`\u00A0\u00A0\u00A0\u00A0`}
            <Button
              type="submit"
              className="btn btn_asSubmit"
              onClick={(event) => addField(event)} // Sends user back to the main page
            >
              Submit
            </Button>
          </center>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </Router>
  );
}

export default AddFieldForm;
