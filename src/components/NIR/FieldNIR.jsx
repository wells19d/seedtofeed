import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import AddNIR from '../NIR/AddNIR';

import '../../../src/index.css';

import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Popover,
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


function FieldNIR(params) {
  const history = useHistory();
  const dispatch = useDispatch();

  // -- Add NIR Popup
const [anchorEl, setAnchorEl] = React.useState(null);
const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

const handleClose = () => {
    setAnchorEl(null);
  };

const open = Boolean(anchorEl);
const id = open ? 'simple-popover' : undefined; 

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
      <Typography className='card-header'>NIR Analysis:</Typography>
      <Card className='cards'>
        <center>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Test Date</b>
                  </TableCell>
                  <TableCell>
                    <b>Oil</b>
                  </TableCell>
                  <TableCell>
                    <b>Moisture</b>
                  </TableCell>
                  <TableCell>
                    <b>Protein</b>
                  </TableCell>
                  <TableCell >
                    <b>Energy</b>
                  </TableCell>
                  <TableCell >
                    <b>Amino Acids</b>
                  </TableCell>
                  {user.farmer && (
                    <TableCell>
                      <b>Edit</b>
                      {`\u00A0\u00A0\u00A0\u00A0`}
                      <b>Delete</b>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {fieldNIR.map((test) => {
                  return (
                    <TableRow key={test.id}>
                      <TableCell>
                        {moment.utc(test.tested_at).format('LL')}
                      </TableCell>
                      <TableCell>
                        <center>{test.oil}%</center>
                      </TableCell>
                      <TableCell>
                        <center>{test.moisture}%</center>
                      </TableCell>
                      <TableCell>
                        <center>{test.protein}%</center>
                      </TableCell>
                      <TableCell>
                        <center>{test.energy}%</center>
                      </TableCell>
                      <TableCell>
                        <center>{test.amino_acids}%</center>
                      </TableCell>

                      {user.farmer && (
                        <TableCell>
                          <Button
                            className='standard-buttons'
                            title="Edit"
                            color="default"
                            onClick={() =>
                              history.push(`/edit_NIR/${fieldID}/${test.id}`)
                            }
                          >
                            {edit}
                          </Button>
                          {`\u00A0\u00A0\u00A0\u00A0`}
                          <Button
                            className='standard-buttons'
                            title="Delete"
                            color="default"
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
        <br />
        {user.farmer && (
          <>
          <Button className='submit-buttons' onClick={handleClick}>
            Add NIR Data
          </Button>
          </>
        )}
        <br />
        <br />
      </Card>
      <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'center',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <Typography ><Card className='popup-cards'><AddNIR/></Card></Typography>
          </Popover>
    </center>
  );
}

export default FieldNIR;
