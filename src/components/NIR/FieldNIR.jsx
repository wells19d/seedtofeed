import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function FieldNIR(params) {
  const history = useHistory();
  const dispatch = useDispatch();

  const fieldNIR = useSelector((store) => store.fieldNIRReducer);

  const fieldID = params.fieldID;

  useEffect(() => {
    dispatch({
      type: 'FETCH_FIELD_NIR',
      payload: fieldID,
    });
  }, []);

  function deleteButton(NIR) {
    dispatch({
      type: 'DELETE_NIR',
      payload: {
        NIRID: NIR,
        fieldID: fieldID,
      },
    });
  }

  return (
    <center>
      <h3>NIR</h3>
      <Grid container spacing={3}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Test Date</TableCell>
                  <TableCell>
                    Oil
                    <br />
                    Levels
                  </TableCell>
                  <TableCell>
                    Moisture
                    <br />
                    Levels
                  </TableCell>
                  <TableCell>
                    Protein
                    <br />
                    Levels
                  </TableCell>
                  <TableCell>
                    Energy
                    <br />
                    Levels
                  </TableCell>
                  <TableCell>
                    Amino
                    <br />
                    Acids
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fieldNIR.map((test) => {
                  return (
                    <TableRow key={test.id}>
                      <TableCell>
                        {moment.utc(test.tested_at).format('MMM Do, YYYY')}
                      </TableCell>
                      <TableCell>{test.oil}</TableCell>
                      <TableCell>{test.moisture}</TableCell>
                      <TableCell>{test.protein}</TableCell>
                      <TableCell>{test.energy}</TableCell>
                      <TableCell>{test.amino_acids}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          onClick={() =>
                            history.push(`/edit_NIR/${fieldID}/${test.id}`)
                          }
                        >
                          Edit
                        </Button>{' '}
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => deleteButton(test.id)}
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
          <br />
          <Button
            size="small"
            onClick={() => history.push(`/NIR_form/${fieldID}`)}
          >
            Add NIR Data
          </Button>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </center>
  );
}

export default FieldNIR;
