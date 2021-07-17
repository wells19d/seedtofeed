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
        </>
    )
}

export default ViewFieldRows;