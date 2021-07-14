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

function BuyerViewFields(params) {
  const dispatch = useDispatch();
  const history = useHistory();

  const fieldList = useSelector((store) => store.fieldListReducer);
  const userList = useSelector((store) => store.userListReducer);
  // console.log('The fieldList', fieldList);

//   const userID = params.userID;

  useEffect(() => {
    dispatch({
      type: 'FETCH_BUYER_FIELD_LIST'
    });
    dispatch({
        type: 'FETCH_USER_LIST'
    })
  }, []);


    function findFarmer(param){
        let farmer_index = userList.findIndex((user) => user.id === Number(param.farmer_id));
        return (
            <span>{userList[farmer_index]?.first_name} {userList[farmer_index]?.last_name}</span>
        )
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
            <TableCell>Farmer</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fieldList.map((field) => (
            <TableRow key={field.id}>
              <TableCell>
              <Button onClick={() => history.push(`/field_details/${field.id}`)}>{field.name}</Button>
              </TableCell>
              <TableCell>{field.location}</TableCell>
              <TableCell>{field.field_status}</TableCell>
              <TableCell>{field.field_note}</TableCell>
              <TableCell>{findFarmer(field)}</TableCell>
              <TableCell> <Button>Make an offer</Button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </center>
  );
}

export default BuyerViewFields;
