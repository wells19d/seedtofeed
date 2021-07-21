import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Select, MenuItem } from '@material-ui/core'

function SetBuyer(params) {
  const dispatch = useDispatch();

  const userList = useSelector((store) => store.userListReducer);

  const [buyerID, setBuyerID] = useState('');
  const fieldID = params.fieldID;

  useEffect(() => {
    dispatch({
      type: 'FETCH_USER_LIST',
    });
  }, []);

  function setProspectiveBuyer() {
    event.preventDefault();

    dispatch({
      type: 'ADD_PROSPECTIVE_BUYER',
      payload: {
        buyerID: buyerID,
        fieldID: fieldID,
      },
    });
  }

  return (
    <div>
      <Select
        variant="outlined"
        value={buyerID}
        required
        style={{ width: '155px' }}
        onChange={(event) => setBuyerID(event.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>
          <em>Prospective Buyer</em>
        </MenuItem>
        {userList?.map((buyer) => {
          console.log('The buyer is: ', buyer);
          return (
            <span key={buyer.id} value={buyer.id}>
              {buyer.buyer && (
                <MenuItem key={buyer.id} value={buyer.id}>
                  {buyer.first_name} {buyer.last_name}
                </MenuItem>
              )}
            </span>
          );
        })}
      </Select>

      <Button
        className="form-cancel"
        type="button"
        onClick={() => params.togglePopup()}
      >
        Cancel
      </Button>
      {`\u00A0\u00A0\u00A0`}
      <Button
        className="form-submit"
        type="button"
        onClick={() => setProspectiveBuyer()}
      >
        Add
      </Button>
    </div>
  );
}

export default SetBuyer;
