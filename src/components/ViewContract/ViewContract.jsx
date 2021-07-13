import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ViewContract() {

    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    const contract = useSelector(store => store.contractListReducer); // Currently we only have contract list in server and planned reducer. Must create a specific view now.
    console.log('here is the contract list:', contract);

    const contractID = params.contractID;
    console.log('here is the contract ID:', contractID);

    useEffect(() => {
        dispatch({
            type: 'FETCH_CONTRACT_LIST',
            payload: contractID
        })
    }, [])

    const foundContract = contract.find((contract) => {
        console.log(contract);
        return contract.contractID === Number(params.contractID);
  });

  console.log('here is the current contract:', foundContract);

    return (
        <>
            <div>
                <h2>Contract Details</h2>
                <b>{foundContract.contract_handler}</b>

                <p><span>Contract ID:</span>   <span>{foundContract.contractID}</span></p> {/* I think this is the Buyer's name but we could make it be the Buyer's ID */}
                <p><span>Grower:</span>   <span>{foundContract.first_name} {foundContract.last_name}</span></p>
                <p><span>Commodity:</span>   <span>{foundContract.crop_type}</span></p>
                <p><span>Status:</span>   <span>{foundContract.name}</span></p>
                <p><span>Contract Quantity:</span>   <span>{foundContract.contract_quantity}</span></p>
                <p><span>Quantity Fulfilled:</span>   <span>{foundContract.quantity_fulfilled}</span></p>
                <p><span>Container S/N:</span>   <span>{foundContract.container_serial}</span></p>
                <p><span>Price:</span>   <span>{foundContract.price}</span></p>

                <b><u>NIR Analysis:</u></b>

                <p><span>Amino Acid:</span>   <span>{foundContract.amino_acids}</span></p> {/* This is living in the NIR table */}
                <p><span>Energy:</span>   <span>{foundContract.energy}</span></p> {/* This is living in the NIR table */}
                <p><span>Protein:</span>   <span>{foundContract.protein}</span></p>
                <p><span>Oil:</span>   <span>{foundContract.oil}</span></p>
                <p><span>Moisture:</span>   <span>{foundContract.moisture}</span></p>
          
            </div>

            <button onClick={() => history.push(`/field_details/${foundContract.fieldID}`)}>
                View Field Details
            </button>
            <button onClick={() => history.push(`/edit_contract/${foundContract.contractID}`)}>
                Edit Contract
            </button>
        </>
    )
}

export default ViewContract;