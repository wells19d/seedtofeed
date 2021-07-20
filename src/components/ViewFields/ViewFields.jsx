import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Card
} from '@material-ui/core';

const submitButton = {
  border: 'solid black 0px',
  background: '#fdb41b',
  padding: '3px 10px',
  boxShadow: '3px 3px 4px 0px grey'
};

const standardButtons = {
  border: 'solid black 0px',
  boxShadow: '2px 2px 3px 0px grey',
  minWidth: '1px'
};

import '../../index.css';

import ViewFieldRows from './ViewFieldRows';

function ViewFields(params) {
  const dispatch = useDispatch();
  const history = useHistory();

  const fieldList = useSelector((store) => store.fieldListReducer);
  // console.log('The fieldList', fieldList);

  const userID = params.userID;
  console.log('here is the userID in ViewFields', userID);

  useEffect(() => {
    dispatch({
      type: 'FETCH_FIELD_LIST',
      payload: userID
    });
  }, []);

  return (
    <center>
      <h4 className='page-title'>
        This is a list of all of your current fields. Please click field to see
        more details or add new field to enter a new field.
      </h4>
      <br />
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Field Name</b>
              </TableCell>
              <TableCell>
                <b>Location</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell>
                <b>Note</b>
              </TableCell>
              <TableCell>
                <b>Buyers</b>
              </TableCell>
              <TableCell align='center'>
                <b>Prospective Buyer</b>
              </TableCell>
              <TableCell align='center'>
                <b>Edit</b>
              </TableCell>
              <TableCell align='center'>
                <b>Delete</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fieldList.map((field) => {
              console.log('This field is: ', field);
              return (
                <TableRow key={field.id}>
                  <ViewFieldRows field={field} />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <p>
        <Button
          className='submit-buttons'
          onClick={() => history.push(`/add_field/`)}
        >
          Add new Field
        </Button>
      </p>
    </center>
  );
}

export default ViewFields;
