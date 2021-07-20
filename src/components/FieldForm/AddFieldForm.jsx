import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useScript } from '../../hooks/useScript';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

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
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState('');

  const crops = useSelector((store) => store.cropListReducer);
  const fieldStatus = useSelector((store) => store.transactionTypesReducer);
  // console.log('here is the list of crops:', crops);
  // console.log('here is the field status list:', fieldStatus);

  // ADD A FIELD
  const addField = (event) => {
    event.preventDefault();

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
      history.push('/user');

      dispatch({
        type: 'SET_FIELD',
        payload: {
          name: fieldName,
          year: fieldYear,
          crop_id: cropType,
          location: location,
          acres: acres,
          field_note: notes,
          image: image,
        },
      });
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
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
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

  useEffect(() => {
    dispatch({
      type: 'FETCH_CROP_LIST',
    });
  }, []);

  return (
    <center>
      <Router>
        <h1>Add Field</h1>
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
          size="small"
        />
        <br />
        <br />
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
          size="small"
        />
        <br />
        <br />
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
          size="small"
        />
        <br />
        <br />
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
          size="small"
        />
        <br />
        <br />
        <FormControl size="small">
          <Select
            variant="outlined"
            value={cropType}
            required
            style={{ width: '155px' }}
            onChange={(event) => setCropType(event.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled size="small">
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
        <Button className="submit-buttons" onClick={openWidget}>
          Upload Field Image
        </Button>
        <br />
        <br />
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
        <center>
          <Button
            className="form-cancel"
            size="small"
            onClick={() => {
              history.push('/user');
            }}
          >
            Cancel
          </Button>
          {`\u00A0\u00A0\u00A0\u00A0`}
          <Button
            className="form-submit"
            size="small"
            onClick={(event) => addField(event)}
          >
            Submit
          </Button>
        </center>
      </Router>
    </center>
  );
}

export default AddFieldForm;
