import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
import Card from '@material-ui/core/Card';

function ViewContract() {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const contract = useSelector((store) => store.contractListReducer); // Currently we only have contract list in server and planned reducer. Must create a specific view now.
  console.log('here is the contract list:', contract);

  const contractID = params.contractID;
  console.log('here is the contract ID:', contractID);






  const user = useSelector((store) => store.user);





  useEffect(() => {
    if (user.farmer === true) {
    dispatch({
      type: 'FETCH_CONTRACT_LIST',
    });}
    if (user.buyer === true) {
      dispatch({
        type: 'FETCH_BUYER_CONTRACT_LIST',
      });
    }
  }, [user]);

  const foundContract = contract.find((contract) => {
    console.log(contract);
    return contract.contractID === Number(params.contractID);
  });

  console.log('here is the current contract:', foundContract);

  return (
    <center>
      <h1>Contract Details</h1>

      <Grid container spacing={3}>
        <Grid item xs={4} />

        <Grid item>
          <h4>{foundContract?.contract_handler}</h4>
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell align='right'>
                    <br />
                    Contract ID:
                    <br />
                    Grower:
                    <br />
                    Commodity:
                    <br />
                    Status:
                    <br />
                    Contract Quantity:
                    <br />
                    Quantity Fulfilled:
                    <br />
                    Container S/N:
                    <br />
                    Price:
                    <br />
                    <br />
                  </TableCell>
                  <TableCell>
                    <br />
                    {foundContract?.contractID}
                    <br />
                    {foundContract?.first_name} {foundContract?.last_name}
                    <br />
                    {foundContract?.crop_type}
                    <br />
                    {foundContract?.name}
                    <br />
                    {foundContract?.contract_quantity}
                    <br />
                    {foundContract?.quantity_fulfilled}
                    <br />
                    {foundContract?.container_serial}
                    <br />
                    {foundContract?.price}
                    <br />
                    <br />
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item>
          <h4>NIR Analysis:</h4>
          <TableContainer component={Paper}>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell align='right'>
                    <br />
                    Amino Acid:
                    <br />
                    Energy:
                    <br />
                    Protein:
                    <br />
                    Oil:
                    <br />
                    Moisture:
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </TableCell>
                  <TableCell>
                    <br />
                    {foundContract?.amino_acids}
                    <br />
                    {foundContract?.energy}
                    <br />
                    {foundContract?.protein}
                    <br />
                    {foundContract?.oil}
                    <br />
                    {foundContract?.moisture}
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={4} />
      </Grid>
      <div className='back-button'>
        <Button onClick={() => history.goBack()}>⬅ Go Back</Button>
      </div>
    </center>
  );
}

export default ViewContract;
