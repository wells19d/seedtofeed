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
  const user = useSelector((store) => store.user);

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
        <br />
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>NIR Test Date</TableCell>
              <TableCell>Oil Levels</TableCell>
              <TableCell>Moisture Levels</TableCell>
              <TableCell>Protein Levels</TableCell>
              <TableCell>Energy</TableCell>
              <TableCell>Amino Acids</TableCell>
                {user.farmer && <TableCell></TableCell>}
              
            </TableRow>
          </TableHead>
          <TableBody>
            {fieldNIR.map((test) => {
              return (
                <TableRow key={test.id}>
                  <TableCell>{moment.utc(test.tested_at).format('MMM Do, YYYY')}</TableCell>
                  <TableCell>{test.oil}</TableCell>
                  <TableCell>{test.moisture}</TableCell>
                  <TableCell>{test.protein}</TableCell>
                  <TableCell>{test.energy}</TableCell>
                  <TableCell>{test.amino_acids}</TableCell>

                    {user.farmer &&
                  <TableCell><Button onClick={() => history.push(`/edit_NIR/${fieldID}/${test.id}`)}>Edit</Button> / <Button color="secondary" onClick={() => deleteButton(test.id)}>Delete</Button>
                  </TableCell>}

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <br />

        {user.farmer &&
      <Button onClick={() => history.push(`/NIR_form/${fieldID}`)}>
        Add NIR Data
      </Button>}
    </center>
  );
}

export default FieldNIR;
