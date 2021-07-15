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


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import '../App/App.css';

const trashCan = <FontAwesomeIcon icon={faTrashAlt} />;
const details = <FontAwesomeIcon icon={faInfoCircle} />;

function ViewContractList(params) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userID = params.userID;
  console.log('Here is the user in ViewContractList:', userID);

  useEffect(() => {
    dispatch({
      type: 'FETCH_CONTRACT_LIST'
    });
  }, []);

  // REDUCER STORE
  const contractList = useSelector((store) => store.contractListReducer);
  console.log('The contractList', contractList);

  function deleteButton(contractID) {
    let remove = confirm(
      'Are you sure you would like to delete this contract? Once deleted it can not be retrieved again.'
    );
    if (remove == true) {
      dispatch({
        type: 'DELETE_CONTRACT',
        payload: contractID
      });
      // history.push(`/contract`);
    } else {
      return;
    }
  }

  return (
    <center>
      <div className='title-indent'>
        <h1>Contract List</h1>
        <h4>
          See a list of your contracts below, click details for more
          information.
        </h4>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Contract #</TableCell>
                  <TableCell>Field Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Commodity</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contractList.map((contract) => (
                  <TableRow key={contract.contractID}>
                    <TableCell>{contract.contractID}</TableCell>
                    <TableCell>
                      <Button
                        size='small'
                        onClick={() =>
                          history.push(`/field_details/${contract.fieldID}`)
                        }
                      >
                        {contract.field_name}
                      </Button>
                    </TableCell>
                    <TableCell>{contract.location}</TableCell>
                    <TableCell>{contract.name}</TableCell>
                    <TableCell>{contract.crop_type}</TableCell>
                    <TableCell>
                      <Button
                        size='large'
                        title='Details'
                        color='primary'
                        onClick={() =>
                          history.push(
                            `/contract_details/${contract.contractID}`
                          )
                        }
                      >
                        {details}
                      </Button>
                      <Button
                        className='button-icons'
                        size='large'
                        title='Delete'
                        color='secondary'
                        onClick={() => deleteButton(contract.contractID)}
                      >
                        {trashCan}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <p>
            <Button
              size='small'
              onClick={() => history.push(`/contract_form/`)}
            >
              Add New Contract
            </Button>
          </p>
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <div className='back-button'>
        <Button onClick={() => history.goBack()}>⬅ Go Back</Button>
      </div>
    </center>
  );
}

export default ViewContractList;
