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

const submitButton = {
    border: 'solid black 0px',
    background: '#fdb41b',
    padding: '3px 10px',
    boxShadow: '3px 3px 4px 0px grey',
  };
  
  const standardButtons = {
    border: 'solid black 0px',
    boxShadow: '2px 2px 3px 0px grey',
    minWidth: '1px',
  };


function ViewFieldRows(param){
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
                <Button style={submitButton}
                    onClick={() => history.push(`/field_details/${field.id}`)}
                >
                    {field.name}
                </Button>
                </TableCell>
                <TableCell>{field.location}</TableCell>
                <TableCell>{field.field_status}</TableCell>
                <TableCell>{field.field_note}</TableCell>
                <TableCell>
                No buyers yet{' '}
                {isOpen && (
                    <SetBuyer togglePopup={togglePopup} fieldID={field.id} />
                )}
                </TableCell>
                <TableCell>
                <Button style={submitButton} onClick={() => togglePopup()}>Add Buyer</Button>
                {`\u00A0\u00A0\u00A0\u00A0`}
                <Button
                style={standardButtons} 
                    className="button-icons"
                    title="Edit"
                    color="default"
                    onClick={() => history.push(`/edit_field/${field.id}`)}
                >
                    {edit}
                </Button>
                {`\u00A0\u00A0\u00A0\u00A0`}
                <Button 
                style={standardButtons} 
                    className="button-icons"
                    title="Delete"
                    color="default"
                    onClick={() => deleteButton(field.id)}
                >
                    {trashCan}
                </Button>
            </TableCell>
        </>
    )
}

export default ViewFieldRows;