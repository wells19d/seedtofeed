import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

const trashCan = <FontAwesomeIcon icon={faTrashAlt} />;
const edit = <FontAwesomeIcon icon={faEdit} />;

const title = {
  fontFamily: 'Montserrat',
  fontStyle: 'italic',
  fontWeight: '600',
}

const buttons = {
  border: 'solid black 0px',
  background: '#fdb41b',
  padding: '3px 10px',
  boxShadow: '3px 3px 4px 0px grey',
};

const cards = {
  border: 'solid black 2px',
  fontFamily: 'Montserrat',
  overflow: 'auto',
  height: '500px',
  fontSize: '14px',
  boxShadow: '3px 3px 4px 1px grey',
};

function FieldNIR(params) {
  const history = useHistory();
  const dispatch = useDispatch();

  const fieldNIR = useSelector((store) => store.fieldNIRReducer);
  const user = useSelector((store) => store.user);

  const fieldID = params.fieldID;

  useEffect(() => {
    dispatch({
      type: 'FETCH_FIELD_NIR',
      payload: fieldID
    });
  }, []);

  function deleteButton(NIR) {
    dispatch({
      type: 'DELETE_NIR',
      payload: {
        NIRID: NIR,
        fieldID: fieldID
      }
    });
  }

  return (
    <>
    <Typography style={title}>
        NIR Analysis:
      </Typography>
    <Card>
    <center>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Test Date</TableCell>
              <TableCell>Oil Levels</TableCell>
              <TableCell>Moisture Levels</TableCell>
              <TableCell>Protein Levels</TableCell>
              <TableCell>Energy</TableCell>
              <TableCell>Amino Acids</TableCell>
              {user.farmer && <TableCell>Edit Delete</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {fieldNIR.map((test) => {
              return (
                <TableRow key={test.id}>
                  <TableCell>
                    {moment.utc(test.tested_at).format('MM/DD/YY - H:MM a')}
                  </TableCell>
                  <TableCell>{test.oil}%</TableCell>
                  <TableCell>{test.moisture}%</TableCell>
                  <TableCell>{test.protein}%</TableCell>
                  <TableCell>{test.energy}%</TableCell>
                  <TableCell>{test.amino_acids}%</TableCell>

                  {user.farmer && (
                    <TableCell>
                      <Button
                        title='Edit'
                        color='primary'
                        onClick={() =>
                          history.push(`/edit_NIR/${fieldID}/${test.id}`)
                        }
                      >
                        {edit}
                      </Button>{' '}
                      <Button
                        title='Delete'
                        color='secondary'
                        onClick={() => deleteButton(test.id)}
                      >
                        {trashCan}
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}

            
          </TableBody>
        </Table>
      </TableContainer>
 </center>
    </Card>
      {user.farmer && (
        <Button onClick={() => history.push(`/NIR_form/${fieldID}`)}>
          Add NIR Data
        </Button>
      )}
   
    </>
  );
}

export default FieldNIR;

/*

<center>
      <br />
      <h4>NIR Analysis</h4>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>NIR Test Date</TableCell>
              <TableCell>Oil Levels</TableCell>
              <TableCell>Moisture Levels</TableCell>
              <TableCell>Protein Levels</TableCell>
              <TableCell>Energy</TableCell>
              <TableCell>Amino Acids</TableCell>
              {user.farmer && <TableCell>Edit Delete</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {fieldNIR.map((test) => {
              return (
                <TableRow key={test.id}>
                  <TableCell>
                    {moment.utc(test.tested_at).format('MMM Do, YYYY')}
                  </TableCell>
                  <TableCell>{test.oil}%</TableCell>
                  <TableCell>{test.moisture}%</TableCell>
                  <TableCell>{test.protein}%</TableCell>
                  <TableCell>{test.energy}%</TableCell>
                  <TableCell>{test.amino_acids}%</TableCell>

                  {user.farmer && (
                    <TableCell>
                      <Button
                        title='Edit'
                        color='primary'
                        onClick={() =>
                          history.push(`/edit_NIR/${fieldID}/${test.id}`)
                        }
                      >
                        {edit}
                      </Button>{' '}
                      <Button
                        title='Delete'
                        color='secondary'
                        onClick={() => deleteButton(test.id)}
                      >
                        {trashCan}
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <br />

      {user.farmer && (
        <Button onClick={() => history.push(`/NIR_form/${fieldID}`)}>
          Add NIR Data
        </Button>
      )}
    </center>

*/