import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function EditFieldForm() {

  const dispatch = useDispatch();


  // LOCAL STATE
  const [heading, setHeading] = useState('Edit Field');

  const [fieldName, setFieldName] = useState('');
  const [fieldYear, setFieldYear] = useState('');
  const [cropType, setCropType] = useState('');
  const [location, setLocation] = useState('');
  const [acres, setAcres] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [notes, setNotes] = useState('');


  useEffect(() => {
    dispatch({
      type: 'FETCH_TRANSACTION_TYPES'
    })
    dispatch({
      type: 'FETCH_CROP_LIST'
    })
  }, [])

    const crops = useSelector((store) => store.crops); // need to double check to make sure this name lines up with redcucer name
    const fieldStatus = useSelector((store) => store.transaction_type); // need to double check to make sure this name lines up with redcucer name

  // temporary list of crops and transaction_type until reducer store is set up
  // const crops = ['barley', 'corn', 'oats', 'soybeans', 'sugarbeets', 'wheat'];
  // const fieldStatus = [
  //   'pre-planting',
  //   'plant',
  //   'application',
  //   'harvest',
  //   'processing',
  //   'transit',
  //   'feed'
  // ];

  // ADD A FIELD
  const updateField = (event) => {
    event.preventDefault();

    alert('Your field has been updated');
    
    dispatch({
      type: 'UPDATE_FIELD', // Need to double check this is the right dispatch type name in saga
      payload: {
        fieldName: fieldName,
        fieldYear: fieldYear,
        cropType: cropType,
        location: location,
        acres: acres,
        currentStatus: currentStatus,
        notes: notes
      }
    });
  }; // end updateField

  return (
    <div>
      <form className='update-field' onSubmit={updateField}>
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
          <label htmlFor='field-year'>
            Field Year:
            <input
              placeholder='YYYY/MM/DD'
              type='text'
              name='field-year'
              value={fieldYear}
              required
              onChange={(event) => setFieldYear(event.target.value)}
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
              <option>Select</option>
              {crops?.map((crop) => {
                console.log('croptype:', crop.crop_type);
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
              <option>Select</option>
              {fieldStatus?.map((status) => {
                console.log('current status is:', status);
                return (
                  <option key={status.id} value={status.name}>
                    {status}
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
            value='Edit Field'
          />
        </div>
      </form>
    </div>
  );
}

export default EditFieldForm;
