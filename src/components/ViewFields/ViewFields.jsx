import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import ViewFieldRows from './ViewFieldRows';
import AddFieldForm from '../FieldForm/AddFieldForm';

import {
  Popover,
  Table,
  Typography,
  TableCell,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  Button,

  Card,
} from '@material-ui/core';

import '../../index.css';

function ViewFields(params) {
  const dispatch = useDispatch();
  const history = useHistory();

  // -- Add Field Popup
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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

              <TableCell width="16%">
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

              <TableCell align="center">
                <b>Prospective Buyer</b>
              </TableCell>
              <TableCell align="center">
                <b>Edit</b>
              </TableCell>
              <TableCell align="center">
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

        <Button className="submit-buttons" onClick={handleClick}>
          Add New Field
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
        >
          <Typography>
            <Card className="popup-cards">
              <AddFieldForm />
            </Card>
          </Typography>
        </Popover>
      </p>
    </center>
  );
}

export default ViewFields;
