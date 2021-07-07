import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function AddFieldForm() {
  // LOCAL STATE
  const [heading, setHeading] = useState('Add a Field');

  const [cropType, setCropType] = useState('');
  const [location, setLocation] = useState('');
  const [acres, setAcres] = useState('');
  const [currentStatus, setCurrentStatus] = useState('');
  const [notes, setNotes] = useState('');

  //   const crops = useSelector((store) => store.crops); // need to double check to make sure this name lines up with redcucer name
  //   const fieldStatus = useSelector((store) => store.transaction_type); // need to double check to make sure this name lines up with redcucer name

  // temporary list of crops and transaction_type until reducer store is set up
  const crops = ['barley', 'corn', 'oats', 'soybeans', 'sugarbeets', 'wheat'];
  const fieldStatus = [
    'pre-planting',
    'plant',
    'application',
    'harvest',
    'processing',
    'transit',
    'feed'
  ];

  // ADD A FIELD
  const addField = (event) => {
    event.preventDefault();

    dispatch({
      type: 'ADD_FIELD', // Need to double check this is the right dispatch type name in saga
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
                    {crop}
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
            value='Add Field'
          />
        </div>
      </form>
    </div>
  );
}

export default AddFieldForm;
