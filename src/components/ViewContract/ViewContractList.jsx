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

const submitButton = {
  border: 'solid black 0px',
  background: '#fdb41b',
  padding: '3px 10px',
  boxShadow: '3px 3px 4px 0px grey',
};

const standardButtons = {
  border: 'solid black 0px',
  boxShadow: '2px 2px 3px 0px grey',
  minWidth: '1px',
};

const trashCan = <FontAwesomeIcon icon={faTrashAlt} />;
const details = <FontAwesomeIcon icon={faInfoCircle} />;

function ViewContractList(params) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userID = params.userID;
  console.log('Here is the user in ViewContractList:', userID);

  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user.farmer === true) {
      dispatch({
        type: 'FETCH_CONTRACT_LIST',
      });

      dispatch({
        type: 'FETCH_CONTRACT_SHORTLIST'
      })
    }
    if (user.buyer === true) {
      dispatch({
        type: 'FETCH_BUYER_CONTRACT_LIST',
      });
    }
  }, [user]);

  // REDUCER STORE
  const contractList = useSelector((store) => store.contractListReducer);
  console.log('The contractList', contractList);

  const contractShortList = useSelector((store) => store.contractShortListReducer); //just for list of contract on this page
  console.log('The contract Short List', contractShortList);

  function deleteButton(contractID) {
    let remove = confirm(
      'Are you sure you would like to delete this contract? Once deleted it can not be retrieved again.'
    );
    if (remove == true) {
      dispatch({
        type: 'DELETE_CONTRACT',
        payload: contractID,
      });
      // history.push(`/contract`);
    } else {
      return;
    }
  }

  return (
    <center>
      <div className="title-indent">
        <h1>Contract List</h1>

        <h4>
          A list of your contracts appear below, click details for more
          information. If you want to add, please select Add New Contract
        </h4>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Contract #</TableCell>
                  <TableCell>Field Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Commodity</TableCell>
                  <TableCell>Details Delete</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {contractShortList.map((contract) => (
                  <TableRow key={contract.contractID}>
                    <TableCell>{contract.contractID}</TableCell>
                    <TableCell>
                      <Button
                       className='submit-buttons'
                        size="small"
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
                      className='standard-buttons'
                        size="large"
                        title="Details"
                        color="default"
                        onClick={() =>
                          history.push(
                            `/contract_details/${contract.contractID}`
                          )
                        }
                      >
                        {details}
                      </Button>


                        {user.farmer &&
                      <Button
                      className='standard-buttons'
                        className='button-icons'
                        size='large'
                        title='Delete'
                        color='default'
                        onClick={() => deleteButton(contract.contractID)}
                      >

                        {trashCan}
                      </Button>}

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <p>
            {user.farmer && (
              <Button
              className='submit-buttons'
                size="small"
                onClick={() => history.push(`/contract_form/`)}
              >
                Add New Contract
              </Button>
            )}
          </p>
        </Grid>
        <Grid item xs={1} />
      </Grid>
      <div className="back-button">
        <Button className='submit-buttons' onClick={() => history.goBack()}>⬅ Go Back</Button>
      </div>
    </center>
  );
}

export default ViewContractList;
