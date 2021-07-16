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
import Grid from '@material-ui/core/Grid';

import '../App/App.css';

function BuyerViewFields(params) {
  const dispatch = useDispatch();
  const history = useHistory();

  const fieldList = useSelector((store) => store.fieldListReducer);
  const userList = useSelector((store) => store.userListReducer);
  // console.log('The fieldList', fieldList);

  useEffect(() => {
    dispatch({
      type: 'FETCH_BUYER_FIELD_LIST'
    });

    dispatch({
      type: 'FETCH_USER_LIST'
    })
  }, []);


  function findFarmer(param) {
    let farmer_index = userList.findIndex((user) => user.id === Number(param.farmer_id));
    return (
      <span>{userList[farmer_index]?.first_name} {userList[farmer_index]?.last_name}</span>
    )
  }

  function farmerEmail(param) {
    let farmer_index = userList.findIndex((user) => user.id === Number(param.farmer_id));
    return (
      alert(`Email ${userList[farmer_index].first_name} ${userList[farmer_index].last_name} at ${userList[farmer_index].username}.`)
    )
  }



  return (
    <center>
      <h4>Below is a list of all of the fields you are listed as a buyer on.  Please click on the field below to see more details.</h4>
      <br />
      <h1>Buyer Field</h1>
      <Grid container spacing={3}>
        <Grid item xs={1} />
        <Grid item xs={10}>
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

                      <Button size="small" onClick={() => history.push(`/field_details/${field.id}`)}>{field.name}</Button>
                    </TableCell>
                    <TableCell>{field.location}</TableCell>
                    <TableCell>{field.field_status}</TableCell>
                    <TableCell>{field.field_note}</TableCell>
                    <TableCell>{findFarmer(field)}</TableCell>
                    <TableCell> <Button onClick={()=>farmerEmail(field)}>Make an offer</Button> </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

        </Grid>
        <Grid item xs={1} />
      </Grid>
    </center>
  );
}

export default BuyerViewFields;
