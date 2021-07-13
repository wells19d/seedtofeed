import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import '../App/App.css';

function ViewContractList(params) {
  const dispatch = useDispatch();
  const history = useHistory();



  const userID = params.userID;

  useEffect(() => {
    dispatch({
      type: 'FETCH_CONTRACT_LIST',
      payload: userID,
    });
    dispatch({
      type: 'FETCH_FIELD_LIST',
      payload: userID,
    });
  }, []);

  // REDUCER STORE
  const fieldList = useSelector((store) => store.fieldListReducer)
  const contractList = useSelector((store) => store.contractListReducer);
  console.log('The fieldList', fieldList);
  console.log('The contractList', contractList);



  function deleteButton(fieldID) {
    dispatch({
      type: 'DELETE_CONTRACT',
      payload: fieldID,
    });
  }

  return (
    <center>
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Field Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Buyer</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contractList.map((field) => (
            <TableRow key={field.id}>
              <TableCell>
              <Button onClick={() => history.push(`/contract_details/${contract.id}`)}>{field.name}</Button>
              </TableCell>
              <TableCell>{field.location}</TableCell>
              <TableCell>{field.field_status}</TableCell>
              <TableCell>{field.field_note}</TableCell>
              <TableCell>Buyer Here</TableCell>
              <TableCell><Button onClick={() => history.push(`/edit_field/${field.id}`)} >
                    Edit
                  </Button> / <Button color="secondary" onClick={() => deleteButton(field.id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <p>
    <Button onClick={() => history.push(`/contract_form/`)}>Add New Contract</Button>
    </p>
    </center>
  );
}

export default ViewContractList;
