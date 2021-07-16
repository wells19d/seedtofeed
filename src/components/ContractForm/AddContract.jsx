import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

function AddContract(params) {
  const userID = params.userID;
  const dispatch = useDispatch();
  const history = useHistory();

  //to be sent along with the contract obj
  const user = useSelector((store) => store.user.username);
  const contractStatus = useSelector((store) => store.contractStatusReducer);
  const crops = useSelector((store) => store.cropListReducer);
  const fields = useSelector((store) => store.fieldListReducer);

  console.log('Here is the contract status list', contractStatus);
  console.log('Here is the crop list', crops);

  const userList = useSelector((store) => store.userListReducer);
  const [buyerID, setBuyerID] = useState(null);

  useEffect(() => {
    dispatch({
      type: 'FETCH_CROP_LIST',
    });
    dispatch({
      type: 'FETCH_CONTRACT_STATUS',
    });
    dispatch({
      type: 'FETCH_FIELD_LIST',
      payload: userID,
    });

    dispatch({
      type: 'FETCH_USER_LIST'
  })

  }, []);

  // LOCAL STATE

  const [user_field_id, setUserFieldID] = useState('');
  const [commodity, setCommodity] = useState('');
  const [openStatus, setOpenStatus] = useState(1);
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

  //for posting to transaction table
  const transType = useSelector((store) => store.fieldTransactionsReducer);
  const fieldTrans = transType[0].transaction_type;
  const fieldStatus = transType[0].field_status;


  // ADD A CONTRACT
  // will also grab the user info.
  const addContract = (event) => {
    event.preventDefault();

    dispatch({
      type: 'SET_CONTRACT', // dispatch to the addContract.saga
      payload: {
        user_field_id: user_field_id, //have to review how this is coming in?
        buyer_id: buyerID,
        commodity: commodity,
        open_status: openStatus,
        bushel_uid: bushel_uid,
        quantity_fulfilled: quantityFulfilled,
        price: price,
        protein: protein,
        oil: oil,
        moisture: moisture,
        contract_quantity: contractQuantity,
        container_serial: containerSerial,
        contract_handler: contractHandler,
        field_status: fieldStatus,
        transaction_type: fieldTrans
        
      },
    });

    alert('Contract has been created');

    history.push('/contract');
  }; // end addContract

  const onFieldChange = (event) =>  {
    setUserFieldID(event.target.value);
    const newField = fields.find(f => f.user_field_id === parseInt(event.target.value));
    if (newField !== -1) {
      setCommodity(newField.crop_id);
    }
  };

  return (
    <Router>
      <h1>Add Contract</h1>
      <FormControl size="small">
        <Select

        variant="outlined"
        value={user_field_id}
        style={{ width: '195px' }}
        required
        displayEmpty
        onChange={onFieldChange}
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
        {/* <FormControl size="small">
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
       </FormControl> */}




        <FormControl size="small">
          <Select
                variant="outlined"
                value={buyerID}
                style={{ width: '195px' }}
                // required
                displayEmpty
                onChange={(event) => setBuyerID(event.target.value)}
                >
            <MenuItem value="" disabled size="small">
                <em>Buyer (optional)</em>
            </MenuItem>
            {userList?.map(buyer => {
                console.log('The buyer is: ', buyer)
            return (
                <span key={buyer.id} value={buyer.id}>
                {buyer.buyer && <MenuItem key={buyer.id} value={buyer.id}>{buyer.first_name} {buyer.last_name}</MenuItem>}
                </span>
            )
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
        type="number"
        value={quantityFulfilled}
        InputProps={{ inputProps: { min: 0 } }}
        onChange={(event) => setQuantityFulfilled(event.target.value)}
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
        required
        InputProps={{ inputProps: { min: 0 } }}
        onChange={(event) => setContractQuantity(event.target.value)}
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
        required
        InputProps={{ inputProps: { min: 0 } }}
        onChange={(event) => setContainerSerial(event.target.value)}
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
      <Button size="small" onClick={(event) => addContract(event)}>
        Submit
      </Button>
    </Router>
  );
}

export default AddContract;
