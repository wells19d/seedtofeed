import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function AddFieldForm() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_TRANSACTION_TYPES',
      type: 'FETCH_CROP_LIST'
    })
  }, [])

  // LOCAL STATE
  const [heading, setHeading] = useState('Add a Field');

  const [fieldName, setFieldName] = useState('');
  const [cropType, setCropType] = useState('');
  const [location, setLocation] = useState('');
  const [acres, setAcres] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [notes, setNotes] = useState('');

  const crops = useSelector((store) => store.cropListReducer); 
  const fieldStatus = useSelector((store) => store.transactionTypesReducer); 
  console.log('here is the list of crops:', crops);
  console.log('here is the field status list:', fieldStatus);

  // ADD A FIELD
  const addField = (event) => {
    event.preventDefault();

    dispatch({
      type: 'SET_FIELD', // Need to double check this is the right dispatch type name in saga
      payload: {
        cropType: cropType,
        location: location,
        acres: acres,
        currentStatus: currentStatus,
        notes: notes
      }
    });
  }; // end addField

  return (
    <div>
      <form className='add-field' onSubmit={addField}>
        <h2>{heading}</h2>

        <div>
          <label htmlFor='field-name'>
            Field Name:
            <input
              placeholder='Name'
              type='text'
              name='field-name'
              value={fieldName}
              required
              onChange={(event) => setFieldName(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor='crop-type'>
            Crop Type:
            <select
              autoFocus
              type='text'
              name='crop-type'
              value={cropType}
              required
              onChange={(event) => setCropType(event.target.value)}
            >
              <option hidden>Select</option>
              {crops.map((crop) => {
                console.log('croptype:', crop);
                return (
                  <option key={crop.id} value={crop.crop_type}>
                    {crop.crop_type}
                  </option>
                );
              })}
            </select>
          </label>
        </div>

        <div>
          <label htmlFor='location'>
            Location:
            <input
              placeholder='Back 40'
              type='text'
              name='location'
              value={location}
              required
              onChange={(event) => setLocation(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor='acres'>
            Acres:
            <input
              placeholder='5'
              type='text'
              name='acres'
              value={acres}
              required
              onChange={(event) => setAcres(event.target.value)}
            />
          </label>
        </div>

        <div>
          <label htmlFor='current-status'>
            Current Status:
            <select
              type='text'
              name='current-status'
              value={currentStatus}
              required
              onChange={(event) => setCurrentStatus(event.target.value)}
            >
              <option hidden>Select</option>
              {fieldStatus.map((status) => {
                console.log('current status is:', status);
                return (
                  <option key={status.id} value={status.name}>
                    {status.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>

        <div>
          <label htmlFor='notes'>
            Notes:
            <textarea
              placeholder='Make a note'
              name='notes'
              value={notes}
              required
              onChange={(event) => setNotes(event.target.value)}
            />
          </label>
        </div>

        <div>
          <input
            className='btn'
            type='submit'
            name='submit'
            value='Add Field'
          />
        </div>
      </form>
    </div>
  );
}

export default AddFieldForm;
