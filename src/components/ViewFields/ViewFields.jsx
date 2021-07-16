import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SetBuyer from '../SetBuyer/SetBuyer';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import '../App/App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const trashCan = <FontAwesomeIcon icon={faTrashAlt} />;
const edit = <FontAwesomeIcon icon={faEdit} />;

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
      payload: userID,
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  function deleteButton(fieldID) {
    if (confirm('Are you sure you would like to delete this field?')) {
      dispatch({
        type: 'DELETE_FIELD',
        payload: fieldID,
      });
    }
  }

  return (
    <center>
      <h4 className="page-title">
        This is a list of all of your current fields. Please click field to see
        more details or add new field to enter a new field.
      </h4>
      <br />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Field Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Buyers</TableCell>
              <TableCell>Edit / Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fieldList.map((field) => {
              console.log('This field is: ', field);
              return (
                <TableRow key={field.id}>
                  <TableCell>
                    <Button
                      onClick={() => history.push(`/field_details/${field.id}`)}
                    >
                      {field.name}
                    </Button>
                  </TableCell>
                  <TableCell>{field.location}</TableCell>
                  <TableCell>{field.field_status}</TableCell>
                  <TableCell>{field.field_note}</TableCell>
                  <TableCell>
                    Buyer Here{' '}
                    {isOpen && (
                      <SetBuyer togglePopup={togglePopup} fieldID={field.id} />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => togglePopup()}>Add Buyer</Button>
                    <Button
                      className="button-icons"
                      title="Edit"
                      color="primary"
                      onClick={() => history.push(`/edit_field/${field.id}`)}
                    >
                      {edit}
                    </Button>{' '}
                    <Button
                      className="button-icons"
                      title="Delete"
                      color="secondary"
                      onClick={() => deleteButton(field.id)}
                    >
                      {trashCan}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <p>
        <Button onClick={() => history.push(`/add_field/`)}>
          Add new Field
        </Button>
      </p>
    </center>
  );
}

export default ViewFields;
