import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function ViewContract() {

    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    const contract = useSelector(store => store.contractReducer); // Currently we only have contract list in server and planned reducer. Must create a specific view now.

    const contractID = params.contractID;

    useEffect(() => {
        dispatch({
            type: 'FETCH_CONTRACT_DETAILS',
            payload: contractID
        })
    }, [])


    return (
        <>
            <div>
                <h2>Contract Details</h2>
                <p>{contract.contract_handler}</p>

                <p><span>Account ID</span>   <span>WHERE IS THIS LOCATED???</span></p>
                <p><span>Grower</span>   <span>USE JOIN HERE{contract.first_name} {contract.last_name}</span></p>
                <p><span>Comodity</span>   <span>USE JOIN HERE{contract.crop_type}</span></p>
                <p><span>Status</span>   <span>{contract.open_status}</span></p>
                <p><span>Contract Quantity</span>   <span>{contract.contract_quantity}</span></p>
                <p><span>Quantity Fulfilled</span>   <span>{contract.quantity_fulfilled}</span></p>
                <p><span>Container S/N</span>   <span>{contract.container_serial}</span></p>
                <p><span>Price</span>   <span>{contract.price}</span></p>

                <p>NIR Analysis</p>

                <p><span>Protein</span>   <span>{contract.protein}</span></p>
                <p><span>Oil</span>   <span>{contract.oil}</span></p>
                <p><span>Moisture</span>   <span>{contract.moisture}</span></p>
                <p><span>Energy</span>   <span>WHERE IS THIS LOCATED???</span></p>
                <p><span>Amino Acid</span>   <span>WHERE IS THIS LOCATED???</span></p>
            </div>

            <button>
                View Field Details
            </button>
            <button>
                Edit Contract
            </button>
        </>
    )
}

export default ViewContract;