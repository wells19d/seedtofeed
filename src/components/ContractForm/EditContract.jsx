import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

function EditContract() {
  const dispatch = useDispatch();
  const history = useHistory();

  //to be sent along with the contract obj
  const user = useSelector((store) => store.user.username);
  const contractStatus = useSelector((store) => store.contractStatusReducer);
  const contractDetails = useSelector((store) => store.contractDetailsReducer);
  const crops = useSelector((store) => store.cropListReducer);

  console.log('Here is the contract status list', contractStatus);
  console.log('Here is the crop list', crops);

  useEffect(() => {
    dispatch({
      type: 'FETCH_CROP_LIST',
    });
    dispatch({
      type: 'FETCH_CONTRACT_STATUS',
    });
    dispatch({
      type: 'FETCH_CONTRACT_DETAILS',
    });
  }, []);

  // LOCAL STATE

  const [commodity, setCommodity] = useState(contractDetails.commodity);
  const [openStatus, setOpenStatus] = useState('');
  const [bushel_uid, setBushel_uid] = useState('');
  const [quantityFulfilled, setQuantityFulfilled] = useState('');
  const [price, setPrice] = useState('');
  const [contractQuantity, setContractQuantity] = useState('');
  const [containerSerial, setContainerSerial] = useState('');
  const [contractHandler, setContractHandler] = useState('');

  // for NIR analysis
  const [protein, setProtein] = useState('');
  const [oil, setOil] = useState('');
  const [moisture, setMoisture] = useState('');

  // EDIT A CONTRACT
  // will also grab the user info.
  const editContract = (event) => {
    event.preventDefault();

    alert('Contract has been updated');


    dispatch({
      type: 'UPDATE_CONTRACT', // dispatch to the updatecontract.saga
      payload: {
        contractID: contractDetails.id, //verify what id we need to dispatch here
        commodity: commodity,
        openStatus: openStatus,
        bushel_uid: bushel_uid,
        quantityFulfilled: quantityFulfilled,
        price: price,
        protein: protein,
        oil: oil,
        moisture: moisture,
        contractQuantity: contractQuantity,
        containerSerial: containerSerial,
        contractHandler: contractHandler,
        userID: user.id, //to be used in the updatecontract.saga //verify this one as well
      },
    });

    // history.push(`/contract`);
  }; // end addContract

  return (
    <Router>
      <h3>Edit Contract</h3>
      <FormControl size="small">
        <Select
        variant="outlined"
        value={user_field_id}
        style={{ width: '195px' }}
        required
        displayEmpty
        onChange={(event) => setUserFieldID(event.target.value)}
        >
          <MenuItem value="" disabled size="small">
            <em>Select Field</em>
          </MenuItem>
          {fields.map((field) => {
                console.log('fieldtype:', field);
                return (
                  <MenuItem key={field.id} value={field.user_field_id}>
                    {field.name}
                  </MenuItem>
                );
              })}
        </Select>
       </FormControl>
        <br />
        <br />
        <FormControl size="small">
        <Select
        variant="outlined"
        value={commodity}
        style={{ width: '195px' }}
        required
        displayEmpty
        onChange={(event) => setCommodity(event.target.value)}
        >
          <MenuItem value="" disabled size="small">
            <em>Select Commodity</em>
          </MenuItem>
          {crops.map((crop) => {
                console.log('fieldtype:', crop);
                return (
                  <MenuItem key={crop.id} value={crop.id}>
                    {crop.crop_type}
                  </MenuItem>
                );
              })}
        </Select>
       </FormControl>
        <br />
        <br />
        <FormControl size="small">
        <Select
        variant="outlined"
        value={openStatus}
        style={{ width: '195px' }}
        required
        displayEmpty
        onChange={(event) => setOpenStatus(event.target.value)}
        >
          <MenuItem value="" disabled size="small">
            <em>Status</em>
          </MenuItem>
          {contractStatus.map((status) => {
                console.log('contract status:', status);
                return (
                  <MenuItem key={status.id} value={status.id}>
                    {status.name}
                  </MenuItem>
                );
              })}
        </Select>
       </FormControl>
        <br />
        <br />

        <TextField
        variant="outlined"
        label="Bushel UID"
        type="text"
        value={bushel_uid}
        onChange={(event) => setBushel_uid(event.target.value)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
      />
      <br />
      <br />
      <TextField
        variant="outlined"
        label="Quantity Fulfilled"
        type="text"
        value={quantityFulfilled}
        onChange={(event) => setQuantityFulfilled(event.target.value)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
      />
      <br />
      <br />
      <TextField
        variant="outlined"
        label="Price"
        type="number"
        value={price}
        InputProps={{ inputProps: { min: 0 } }}
        onChange={(event) => setPrice(event.target.value)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
      />
      <br />
      <br />
      <TextField
        variant="outlined"
        label="Protein"
        type="number"
        value={protein}
        InputProps={{ inputProps: { min: 0 } }}
        onChange={(event) => setProtein(event.target.value)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
      />
      <br />
      <br />
      <TextField
        variant="outlined"
        label="Moisture"
        type="number"
        value={moisture}
        InputProps={{ inputProps: { min: 0 } }}
        onChange={(event) => setMoisture(event.target.value)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
      />
      <br />
      <br />
      <TextField
        variant="outlined"
        label="Oil"
        type="number"
        value={oil}
        InputProps={{ inputProps: { min: 0 } }}
        onChange={(event) => setOil(event.target.value)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
      />
      <br />
      <br />
      <TextField
        variant="outlined"
        label="Contract Quantity"
        type="number"
        value={contractQuantity}
        InputProps={{ inputProps: { min: 0 } }}
        onChange={(event) => setContractQuantity(event.target.value)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
      />
      <br />
      <br />
      <TextField
        variant="outlined"
        label="Container Serial Number"
        type="number"
        value={containerSerial}
        InputProps={{ inputProps: { min: 0 } }}
        onChange={(event) => setContainerSerial(event.target.value)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
      />
      <br />
      <br />
      <TextField
        variant="outlined"
        label="Contract Handler"
        type="text"
        value={contractHandler}
        onChange={(event) => setContractHandler(event.target.value)}
        required
        InputLabelProps={{
          shrink: true,
        }}
        size="small"
      />
     <br />
     <br />
      <Button
          size="small"
          onClick={() => {
            history.push('/contract');
          }}
        >
          Cancel
        </Button>
        {`\u00A0\u00A0\u00A0\u00A0`}
        <Button size="small" onClick={(event) => editContract(event)}>
          Submit
        </Button>
    </Router>
  );
}

export default EditContract;
