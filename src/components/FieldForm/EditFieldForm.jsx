import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
  // console.log('Field List Details', fieldList);

  const fieldID = params.fieldID;
  // console.log(`check`, fieldID, 3);

  const field_index = fieldList.findIndex(
    (list) => list.id === Number(fieldID)
  );
  // console.log('The index is', field_index);

  const field_to_edit = fieldList[field_index];

  // console.log('What is the id?', field_to_edit.id);
  // console.log('What is the name?', field_to_edit.name);
  // console.log('What is the year', field_to_edit.year);
  // console.log('What is the crop type?', field_to_edit.crop_id);
  // console.log('What is location?', field_to_edit.location);
  // console.log('What is acres?', field_to_edit.acres);
  // console.log('What is status?', field_to_edit.currentStatus);
  // console.log('What are the notes?', field_to_edit.field_note);

  // LOCAL STATE

  // These need to be fixed to pull in the values
  // right now all they do is empty the fields

  const [fieldName, setFieldName] = useState(field_to_edit.name);
  const [fieldYear, setFieldYear] = useState(field_to_edit.year);
  const [cropType, setCropType] = useState(field_to_edit.crop_id);
  const [location, setLocation] = useState(field_to_edit.location);
  const [acres, setAcres] = useState(field_to_edit.acres);
  const [notes, setNotes] = useState(field_to_edit.field_note);

  const crops = useSelector((store) => store.cropListReducer);
  const fieldStatus = useSelector((store) => store.transactionTypesReducer);
  // console.log('here is the list of crops:', crops);
  // console.log('here is the field status list:', fieldStatus);

  useEffect(() => {
    dispatch({
      type: 'FETCH_CROP_LIST',
    });
  }, []);

  // EDIT A FIELD
  const updateField = (event) => {
    event.preventDefault();

    // alert('Your field has been updated');

    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        
        name: fieldName,
        year: fieldYear,
        crop_id: cropType,
        location: location,
        acres: acres,
        field_note: notes,
        fieldID: fieldID,
      },
    });
    history.push('/user');
  }; 

  return (
    <Router>
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
          <br/>
          <br/>
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
          />
          <br/>
          <br/>
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
          />
          <br/>
          <br/>
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
          <br/>
          <br/>
          <Select
            variant="outlined"
            value={cropType}
            required
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
          <br/>
          <br/>
          <TextField
            variant="outlined"
            label="Field Notes"
            type="text"
            value={notes}
            helperText={`${notes.length}/${CHARACTER_LIMIT}`}
            onChange={(event) => setNotes(event.target.value)}
            required
            InputLabelProps={{
              shrink: true,
            }}
          />
          <center>
            <Button
              type="button"
              className="btn btn_asCancel"
              onClick={() => {
                history.push('/user'); 
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
    </Router>
  );
}

export default EditFieldForm;
