import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useScript } from '../../hooks/useScript';

import {
  Button,
  Card,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';

function EditFieldForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const CHARACTER_LIMIT = 500;
  const params = useParams();

  const fieldList = useSelector((store) => store.fieldListReducer);

  const fieldID = Number(params.fieldID);

  const field_index = fieldList.findIndex(
    (list) => list.id === Number(fieldID)
  );

  const field_to_edit = fieldList[field_index];

  const transType = useSelector((store) => store.fieldTransactionsReducer);

  //obtain field status of field that is being edited
  const fieldTrans = transType[0]?.transaction_type;
  const fieldStatus2 = transType[0]?.field_status;

  const [fieldName, setFieldName] = useState(field_to_edit?.name);
  const [fieldYear, setFieldYear] = useState(field_to_edit?.year);
  const [cropType, setCropType] = useState(field_to_edit?.crop_id);
  const [location, setLocation] = useState(field_to_edit?.location);
  const [acres, setAcres] = useState(field_to_edit?.acres);
  const [notes, setNotes] = useState(field_to_edit?.field_note);
  const [image, setImage] = useState(field_to_edit?.image);

  const crops = useSelector((store) => store.cropListReducer);
  const fieldStatus = useSelector((store) => store.transactionTypesReducer);

  useEffect(() => {
    dispatch({
      type: 'FETCH_CROP_LIST',
    });
    dispatch({
      type: 'FETCH_FIELD_LIST',
      payload: fieldID,
    });
  }, []);

  // EDIT A FIELD
  const updateField = (event) => {
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
          image: image,
        },
      });
      alert('Your field has been updated');
      history.push('/user');
    }
  };

  const openWidget = () => {
    !!window.cloudinary &&
      window.cloudinary
        .createUploadWidget(
          {
            sources: ['local', 'url', 'camera'],
            cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
          },
          function (error, result) {
            if (!error && result && result.event === 'success') {
              setImage(result.info.secure_url);
            }
          }
        )
        .open();
  };

  return (
    <Router>
      <center>
        <Card className="cards card-width">
          <h1>Edit Field</h1>
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
              size="small"
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
          <Button type="button" onClick={openWidget}>
            Upload Field Image
          </Button>
          <br />
          <br />
          <TextField
            variant="outlined"
            label="Field Notes"
            type="text"
            value={notes}
            style={{ minWidth: '300px' }}
            helperText={`${notes?.length}/${CHARACTER_LIMIT}`}
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
              onClick={(event) => updateField(event)}
            >
              Submit
            </Button>
            <br />
            <br />
          </center>
        </Card>
        <br />

        <Button className="submit-buttons" onClick={() => history.goBack()}>
          ⬅ Go Back
        </Button>
      </center>
    </Router>
  );
}

export default EditFieldForm;
