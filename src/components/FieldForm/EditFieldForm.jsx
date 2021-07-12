import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  HashRouter as Router,
  Route,
  useHistory,
  useParams,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function EditFieldForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const CHARACTER_LIMIT = 500;
  const params = useParams();

  // const userID = params.userID;

  // useEffect(() => {
  //   dispatch({
  //     type: 'FETCH_FIELD_LIST',
  //     payload: userID,
  //   });
  // }, []);

  const fieldList = useSelector((store) => store.fieldListReducer);
  console.log('Field List Details', fieldList);

  const fieldID = params.fieldID;
  console.log(`check`, fieldID, 3);

  const field_index = fieldList.findIndex(
    (list) => list.id === Number(fieldID)
  );
  console.log('The index is', field_index);

  const field_to_edit = fieldList[field_index];

  console.log('What is the id?', field_to_edit.id);
  console.log('What is the name?', field_to_edit.name);
  console.log('What is the year', field_to_edit.year);
  // console.log('What is the crop type?', field_to_edit.crop_id);
  console.log('What is location?', field_to_edit.location);
  console.log('What is acres?', field_to_edit.acres);
  // console.log('What is status?', field_to_edit.currentStatus);
  console.log('What are the notes?', field_to_edit.field_note);

  // LOCAL STATE

  // These need to be fixed to pull in the values
  // right now all they do is empty the fields

  const [fieldName, setFieldName] = useState(field_to_edit.name);
  const [fieldYear, setFieldYear] = useState(field_to_edit.year);
  const [cropType, setCropType] = useState(''); // should they be able to edit?
  const [location, setLocation] = useState(field_to_edit.location);
  const [acres, setAcres] = useState(field_to_edit.acres);
  const [currentStatus, setCurrentStatus] = useState(''); // should they be able to edit?
  const [notes, setNotes] = useState(field_to_edit.field_note);

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


  // EDIT A FIELD
  const updateField = (event) => {
    event.preventDefault();

    alert('Your field has been updated');

    dispatch({
      type: 'UPDATE_FIELD', // Need to double check this is the right dispatch type name in saga
      payload: {
        name: fieldName,
        year: fieldYear,
        crop_id: cropType,
        location: location,
        acres: acres,
        current_status: currentStatus,
        field_note: notes,
        fieldID: fieldID
      },
    });

    // history.push('/user');
  }; // end updateField

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
                  {crop.crop_id}
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
              return (
                <MenuItem key={status.id} value={status.name}>
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
              onClick={(event) => updateField(event)} // Sends user back to the main page
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

export default EditFieldForm;
