import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SetBuyer from '../SetBuyer/SetBuyer';

import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const trashCan = <FontAwesomeIcon icon={faTrashAlt} />;
const edit = <FontAwesomeIcon icon={faEdit} />;

import '../../index.css';

function ViewFieldRows(param) {
  const dispatch = useDispatch();
  const history = useHistory();

  const field = param.field;

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
    <>
      <TableCell>
        <Button
          className="submit-buttons"
          onClick={() => history.push(`/field_details/${field.id}`)}
        >
          {field.name}
        </Button>
      </TableCell>
      <TableCell>{field.location}</TableCell>
      <TableCell className="capitalize">{field.field_status}</TableCell>
      <TableCell>{field.field_note}</TableCell>
      <TableCell>
        No buyers
        {isOpen && <SetBuyer togglePopup={togglePopup} fieldID={field.id} />}
      </TableCell>

      <TableCell align="center">
        <Button className="submit-buttons" onClick={() => togglePopup()}>
          Add
        </Button>
      </TableCell>
      <TableCell>
        <Button
          className="standard-buttons"
          title="Edit"
          color="default"
          onClick={() => history.push(`/edit_field/${field.id}`)}
        >
          {edit}
        </Button>
      </TableCell>
      <TableCell>
        <Button
          className="standard-buttons"
          title="Delete"
          color="default"
          onClick={() => deleteButton(field.id)}
        >
          {trashCan}
        </Button>
      </TableCell>
    </>
  );
}

export default ViewFieldRows;
