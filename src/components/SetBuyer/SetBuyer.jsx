import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function SetBuyer(){

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const userList = useSelector((store) => store.userListReducer);

    const [buyerID, setBuyerID] = useState('');
    const fieldID = params.fieldID;

    useEffect(() => {
    dispatch({
        type: 'FETCH_USER_LIST'
    })
    }, []);

    function setProspectiveBuyer(){
    event.preventDefault();

    dispatch({
        type: 'ADD_PROSPECTIVE_BUYER',
        payload: {
        buyerID: buyerID,
        fieldID: fieldID
        }
    })

    history.push('/user'); 
    }

    return (
        <>
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
            {userList.map(buyer => {
            return (
                <>
                {buyer.buyer && <MenuItem key={buyer.id} value={buyer.id}>{buyer.first_name} {buyer.last_name}</MenuItem>}
                </>
            )
            })}
            </Select>

            <Button type="button" onClick={() => {history.push('/user')}}>
                Cancel
            </Button>
            <Button type="button" onClick={()=>setProspectiveBuyer()}>
                Add
            </Button>
        </>
    )
}

export default SetBuyer;