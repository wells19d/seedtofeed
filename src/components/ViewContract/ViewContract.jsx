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


function ViewContract({ fieldID }) {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const contracts = useSelector((store) => store.contractListReducer); // Currently we only have contract list in server and planned reducer. Must create a specific view now.
  console.log('here is the contract list:', contracts);

  const contractID = params.contractID;
  console.log('here is the contract ID:', contractID);






  const user = useSelector((store) => store.user);





  useEffect(() => {
    if (user.farmer === true) {
      dispatch({
        type: 'FETCH_CONTRACT_LIST',
      });
    }
    if (user.buyer === true) {
      dispatch({
        type: 'FETCH_BUYER_CONTRACT_LIST',
      });
    }
  }, [user]);

  // const foundContract = contracts?.find((contract) => {
  //   console.log(contract);
  //   return contract.contractID === Number(params.contractID);
  // });
  console.log('the fieldID for the contract', fieldID);
  console.log('the userID for the contract', user.id);

  if (contracts?.length === 1) {
    return (

      <center>
  
        <h1>Contract Details</h1>
  
        <Grid container spacing={3}>
          <Grid item xs={4} />
  
          <Grid item>
  
            <h4>Contract Handler: {contracts[0]?.contract_handler}</h4>
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
                      {contracts[0]?.contractID}
                      <br />
                      {contracts[0]?.first_name} {contracts[0]?.last_name}
                      <br />
                      {contracts[0]?.crop_type}
                      <br />
                      {contracts[0]?.name}
                      <br />
                      {contracts[0]?.contract_quantity}
                      <br />
                      {contracts[0]?.quantity_fulfilled}
                      <br />
                      {contracts[0]?.container_serial}
                      <br />
                      {contracts[0]?.price}
                      <br />
                      <br />
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item>
            <h4>NIR Quality Expectations:</h4>
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
                      {contracts[0]?.amino_acids}%
                      <br />
                      {contracts[0]?.energy}%
                      <br />
                      {contracts[0]?.protein}%
                      <br />
                      {contracts[0]?.oil}%
                      <br />
                      {contracts[0]?.moisture}%
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
          <Button className='form-submit' onClick={() => history.goBack()}>⬅ Go Back</Button>
        </div>
      </center>
    );
  
  } else {
    return (
      <center>
      
      <h1>Contract Details</h1>
      {contracts?.map((contract) => {
        return (
          <Grid container spacing={3}>
          <Grid item xs={4} />
  
          <Grid item>
            <h4>Contract Handler: {contract.contract_handler}</h4>
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
                      {contract.contractID}
                      <br />
                      {contract.first_name} {contract.last_name}
                      <br />
                      {contract.crop_type}
                      <br />
                      {contract.name}
                      <br />
                      {contract.contract_quantity}
                      <br />
                      {contract.quantity_fulfilled}
                      <br />
                      {contract.container_serial}
                      <br />
                      {contract.price}
                      <br />
                      <br />
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item>
            <h4>NIR Quality Expectations: {contract.bushel_uid}</h4>
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
                      {contract.amino_acids}%
                      <br />
                      {contract.energy}%
                      <br />
                      {contract.protein}%
                      <br />
                      {contract.oil}%
                      <br />
                      {contract.moisture}%
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
  
        );
        
      })}
      <div className='back-button'>
        <Button className='form-submit' onClick={() => history.goBack()}>⬅ Go Back</Button>
      </div>
    </center>

    );
    
  }
  

}

export default ViewContract;
