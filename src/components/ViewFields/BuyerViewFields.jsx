import React, { useEffect } from 'react';
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
  Grid,
} from '@material-ui/core';

import '../App/App.css';

function BuyerViewFields(params) {
  const dispatch = useDispatch();
  const history = useHistory();

  const fieldList = useSelector((store) => store.fieldListReducer);
  const userList = useSelector((store) => store.userListReducer);

  useEffect(() => {
    dispatch({
      type: 'FETCH_BUYER_FIELD_LIST',
    });

    dispatch({
      type: 'FETCH_USER_LIST',
    });
  }, []);

  function findFarmer(param) {
    let farmer_index = userList.findIndex(
      (user) => user.id === Number(param.farmer_id)
    );
    return (
      <span>
        {userList[farmer_index]?.first_name} {userList[farmer_index]?.last_name}
      </span>
    );
  }

  function farmerEmail(param) {
    let farmer_index = userList.findIndex(
      (user) => user.id === Number(param.farmer_id)
    );
    return alert(
      `Email ${userList[farmer_index].first_name} ${userList[farmer_index].last_name} at ${userList[farmer_index].username}.`
    );
  }

  return (
    <center>
      <h4 className="page-title">
        Below is a list of all of the fields you are listed as a buyer on.
        Please click on the field below to see more details.
      </h4>
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
                      <Button
                        className="submit-buttons"
                        size="small"
                        onClick={() =>
                          history.push(`/field_details/${field.id}`)
                        }
                      >
                        {field.name}
                      </Button>
                    </TableCell>
                    <TableCell>{field.location}</TableCell>
                    <TableCell>{field.field_status}</TableCell>
                    <TableCell>{field.field_note}</TableCell>
                    <TableCell>{findFarmer(field)}</TableCell>
                    <TableCell>
                      <Button
                        className="submit-buttons"
                        onClick={() => farmerEmail(field)}
                      >
                        Make an offer
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <br />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </center>
  );
}

export default BuyerViewFields;
