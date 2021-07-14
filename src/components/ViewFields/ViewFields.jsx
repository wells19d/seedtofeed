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

  function deleteButton(fieldID) {
    let remove = confirm(
      'Are you sure you would like to delete this field? Once deleted it can not be retrieved again.'
    );
    if (remove == true) {
      dispatch({
        type: 'DELETE_FIELD',
        payload: fieldID,
      });
    } else {
      return;
    }
  }

  return (
    <center>
      <h3>Field List</h3>
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
                  <TableCell>Buyer</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fieldList.map((field) => {
                  return (
                    <TableRow key={field.id}>
                      <TableCell>
                        <Button
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
                      <TableCell>Buyer Here</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          onClick={() =>
                            history.push(`/edit_field/${field.id}`)
                          }
                        >
                          Edit
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => deleteButton(field.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <p>
            <Button size="small" onClick={() => history.push(`/add_field/`)}>
              Add new Field
            </Button>
          </p>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </center>
  );
}

export default ViewFields;
