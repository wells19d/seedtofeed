import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useScript } from '../../hooks/useScript';

import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core';

const cards = {
  border: 'solid black 2px',
  fontFamily: 'Montserrat',
  overflow: 'auto',
  fontSize: '14px',
  boxShadow: '3px 3px 4px 1px grey',
  width: '400px',
  padding: '20px'
};

const standardButtons = {
  border: 'solid black 0px',
  boxShadow: '2px 2px 3px 0px grey',
  minWidth: '1px'
};

function EditFieldForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const CHARACTER_LIMIT = 500;
  const params = useParams();

  const fieldList = useSelector((store) => store.fieldListReducer);
  // console.log('Field List Details', fieldList);

  const fieldID = Number(params.fieldID);
  // console.log(`check`, fieldID, 3);

  const field_index = fieldList.findIndex(
    (list) => list.id === Number(fieldID)
  );
  // console.log('The index is', field_index);

  const field_to_edit = fieldList[field_index];

  const transType = useSelector((store) => store.fieldTransactionsReducer);

  //obtain field status of field that is being edited
  const fieldTrans = transType[0]?.transaction_type;
  const fieldStatus2 = transType[0]?.field_status;

  // LOCAL STATE

  // These need to be fixed to pull in the values
  // right now all they do is empty the fields

  const [fieldName, setFieldName] = useState(field_to_edit?.name);
  const [fieldYear, setFieldYear] = useState(field_to_edit?.year);
  const [cropType, setCropType] = useState(field_to_edit?.crop_id);
  const [location, setLocation] = useState(field_to_edit?.location);
  const [acres, setAcres] = useState(field_to_edit?.acres);
  const [notes, setNotes] = useState(field_to_edit?.field_note);
  const [image, setImage] = useState(field_to_edit?.image);

  const crops = useSelector((store) => store.cropListReducer);
  const fieldStatus = useSelector((store) => store.transactionTypesReducer);
  // console.log('here is the list of crops:', crops);
  // console.log('here is the field status list:', fieldStatus);

  useEffect(() => {
    dispatch({
      type: 'FETCH_CROP_LIST'
    });
    dispatch({
      type: 'FETCH_FIELD_LIST',
      payload: fieldID
    });
  }, []);

  // EDIT A FIELD
  const updateField = (event) => {
    event.preventDefault();

    // alert('Your field has been updated');

    if (
      (fieldName.length === 0,
      fieldYear.length === 0,
      cropType.length === 0,
      location.length === 0,
      acres.length === 0,
      notes.length === 0)
    ) {
      return alert('Please fill in required fields');
    } else {
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
          transaction_type: fieldTrans,
          field_status: fieldStatus2,
          image: image
        }
      });
      history.push('/user');
    }
  };

  const openWidget = () => {
    // Currently there is a bug with the Cloudinary <Widget /> component
    // where the button defaults to a non type="button" which causes the form
    // to submit when clicked. So for now just using the standard widget that
    // is available on window.cloudinary
    // See docs: https://cloudinary.com/documentation/upload_widget#look_and_feel_customization
    !!window.cloudinary &&
      window.cloudinary
        .createUploadWidget(
          {
            sources: ['local', 'url', 'camera'],
            cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
          },
          function (error, result) {
            console.log(result);
            if (!error && result && result.event === 'success') {
              // When an upload is successful, save the uploaded URL to local state!
              setImage(result.info.secure_url);
            }
          }
        )
        .open();
  };

  return (
    <Router>
      <center>
        <Card style={cards}>
          <h1>Edit Field</h1>
          <TextField
            variant='outlined'
            label='Field Name'
            type='text'
            value={fieldName}
            onChange={(event) => setFieldName(event.target.value)}
            required
            InputLabelProps={{
              shrink: true
            }}
            size='small'
          />
          <br />
          <br />
          <TextField
            variant='outlined'
            label='Location'
            type='text'
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
            InputLabelProps={{
              shrink: true
            }}
            size='small'
          />
          <br />
          <br />
          <TextField
            variant='outlined'
            label='Number of Acres'
            type='number'
            value={acres}
            InputProps={{ inputProps: { min: 0 } }}
            onChange={(event) => setAcres(event.target.value)}
            required
            InputLabelProps={{
              shrink: true
            }}
            size='small'
          />
          <br />
          <br />
          <TextField
            variant='outlined'
            label='Year'
            type='number'
            value={fieldYear}
            InputProps={{ inputProps: { min: 1900 } }}
            onChange={(event) => setFieldYear(event.target.value)}
            required
            InputLabelProps={{
              shrink: true
            }}
            size='small'
          />
          <br />
          <br />
          <FormControl size='small'>
            <Select
              variant='outlined'
              value={cropType}
              required
              style={{ width: '155px' }}
              size='small'
              onChange={(event) => setCropType(event.target.value)}
              displayEmpty
            >
              <MenuItem value='' disabled size='small'>
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
          </FormControl>
          <br />
          <br />
          {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
          <Button type='button' onClick={openWidget}>
            Upload Field Image
          </Button>
          <br />
          <br />
          <TextField
            variant='outlined'
            label='Field Notes'
            type='text'
            value={notes}
            style={{ minWidth: '300px' }}
            helperText={`${notes?.length}/${CHARACTER_LIMIT}`}
            onChange={(event) => setNotes(event.target.value)}
            required
            InputLabelProps={{
              shrink: true
            }}
          />
          <center>
            <Button
              className='submit-buttons'
              size='small'
              onClick={() => {
                history.push('/user');
              }}
            >
              Cancel
            </Button>
            {`\u00A0\u00A0\u00A0\u00A0`}
            <Button
              className='submit-buttons'
              size='small'
              onClick={(event) => updateField(event)}
            >
              Submit
            </Button>
          </center>
        </Card>
      </center>
      <Button  style={standardButtons} onClick={() => history.goBack()}>
        ⬅ Go Back
      </Button>
    </Router>
  );
}

export default EditFieldForm;
