import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function AddContract() {
    const dispatch = useDispatch();

    //to be sent along with the contract obj
    const user = useSelector(store => store.user.username);
    const contractStatus = useSelector(store => store.contractStatusReducer);
    const crops = useSelector((store) => store.cropListReducer);
    const fields = useSelector((store) => store.fieldListReducer);

    console.log('Here is the contract status list', contractStatus);
    console.log('Here is the crop list', crops);


    useEffect(() => {
        dispatch({
            type: 'FETCH_CROP_LIST',
        })
        dispatch({
            type: 'FETCH_CONTRACT_STATUS'
        })
    }, [])

    // LOCAL STATE
    const [heading, setHeading] = useState('Add Contract');

    const [user_field_id, setUserFieldID] = useState('');
    const [commodity, setCommodity] = useState('');
    const [openStatus, setOpenStatus] = useState('');
    const [bushel_uid, setBushel_uid] = useState('');
    const [quantityFulfilled, setQuantityFulfilled] = useState('');
    const [price, setPrice] = useState('');
    const [contractQuantity, setContractQuantity] = useState('');
    const [containerSerial, setContainerSerial] = useState('');
    const [contractHandler, setContractHandler] = useState('');
    const [sendtoBushel, setSendtoBushel] = useState(false);

    // for NIR analysis
    const [protein, setProtein] = useState('');
    const [oil, setOil] = useState('');
    const [moisture, setMoisture] = useState('');



    // ADD A CONTRACT
    // will also grab the user info.
    const addContract = (event) => {
        event.preventDefault();
        console.log('sending to Bushel?', sendtoBushel);
        if (sendtoBushel === true) {
            //build the contract obj
            /*
            {
  "data": [
    {
      "update-contracts": {
        "contracts": [
          {
            "basis_cost": 0,
            "basis_cost_locked": true,
            "bid": "0",
            "commodity_id": "commodity", //local contract
            "completed": false,
            "contract_location": "nci-mock-elevator",
            "created_at": "2021-07-04T15:00:00.000Z",
            "crop_year": "2021",
            "currency": "dollars",
            "delivery_period_end": "2019-07-31T15:00:00.000Z", 
            "delivery_period_start": "2019-06-30T15:42:35.000Z",
            "display_id": "containerSerial", //local contract
            "filled": false,
            "id": "bushel_uid", //local contract
            "is_price_later_contract": true,
            "is_signed": false,
            "priced": true,
            "quantity_canceled": 0,
            "quantity_contracted": contractQuantity,
            "quantity_measure": "weight",
            "quantity_uom": "bu",
            "quantity_submitted": quantityFulfilled, //local contract
            "updated_at": (new Date()).toISOString(),
            "user_id": "user.username", //local contract
            "version": "2.0.0"
          }
        ]
      }
    }
  ]
}
            */
            //dispatch contract to Bushel

            //https://router.translator.bushelops.com/api/v1/push
        }

        dispatch({
            type: 'SET_CONTRACT', // dispatch to the addContract.saga
            payload: {
                user_field_id: user_field_id, //dropdown list
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

            }
        });
    }; // end addContract

    return (
        <div>
            <form className='add-contract' onSubmit={addContract}>
                <h2>{heading}</h2>
                <div>
                    <label htmlFor='fieldList'>
                        Field List:
                        <select
                            type='text'
                            name='status'
                            value={user_field_id}
                            required
                            onChange={(event) => setUserFieldID(event.target.value)}
                        >
                            <option >Select</option>
                            {fields.map((field) => {
                                console.log('fieldtype:', field);
                                return (
                                    <option key={field.id} value={field.user_field_id}>
                                        {field.name}
                                    </option>
                                );
                            })}
                        </select>
                    </label>
                </div>
                <div>
                    <label htmlFor='commodity'>
                        Commodity:
                        <select
                            type='text'
                            name='status'
                            value={commodity}
                            required
                            onChange={(event) => setCommodity(event.target.value)}
                        >
                            <option>Select</option>
                            {crops.map((crop) => {
                                console.log('croptype:', crop);
                                return (
                                    <option key={crop.id} value={crop.id}>
                                        {crop.crop_type}
                                    </option>
                                );
                            })}
                        </select>
                    </label>
                </div>

                <div>
                    <label htmlFor='open-status'>
                        Open Status:
                        <select
                            type='text'
                            name='status'
                            value={openStatus}
                            required
                            onChange={(event) => setOpenStatus(event.target.value)}
                        >
                            <option>Select</option>
                            {contractStatus.map((status) => {
                                console.log('contract status:', status);
                                return (
                                    <option key={status.id} value={status.id}>
                                        {status.name}
                                    </option>
                                );
                            })}
                        </select>
                    </label>
                </div>

                <div>
                    <label htmlFor='bushel-uid'>
                        Bushel Id:
                        <input
                            placeholder='Bushel UID'
                            type='text'
                            name='Bushel User Id'
                            value={bushel_uid}
                            required
                            onChange={(event) => setBushel_uid(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='send-to-bushel'>
                        Create Bushel Contract:
                        <input
                            placeholder='send'
                            type='checkbox'
                            name='send-to-bushel'
                            defaultchecked={sendtoBushel}
                            required
                            onChange={() => setSendtoBushel(true)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='quantity-fulfilled'>
                        Quantity Fulfilled:
                        <input
                            placeholder='Quantity'
                            type='number' min="0"
                            name='Quantity Fulfilled'
                            value={quantityFulfilled}
                            required
                            onChange={(event) => setQuantityFulfilled(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='price'>
                        Price:
                        <input
                            placeholder='Price'
                            type='number' min="0"
                            name='price'
                            value={price}
                            required
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='protein'>
                        Protein:
                        <input
                            placeholder='Protein'
                            type='number' min="0"
                            name='protein'
                            value={protein}
                            required
                            onChange={(event) => setProtein(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='moisture'>
                        Moisture:
                        <input
                            placeholder='Moisture'
                            type='number' min="0"
                            name='Moisture'
                            value={moisture}
                            required
                            onChange={(event) => setMoisture(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='oil'>
                        Oil:
                        <input
                            placeholder='Oil'
                            type='number' min="0"
                            name='oil'
                            value={oil}
                            required
                            onChange={(event) => setOil(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='contract-quantity'>
                        Contract Quantity:
                        <input
                            placeholder='Contract Quantity'
                            type='number' min="0"
                            name='quantity'
                            value={contractQuantity}
                            required
                            onChange={(event) => setContractQuantity(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='container-serial'>
                        Container Serial Number
                        <input
                            placeholder='Container Serial'
                            type='text'
                            name='container serial'
                            value={containerSerial}
                            required
                            onChange={(event) => setContainerSerial(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='contract-handler'>
                        Contract Handler:
                        <input
                            placeholder='Contract Handler'
                            type='text'
                            name='Contract Handler'
                            value={contractHandler}
                            required
                            onChange={(event) => setContractHandler(event.target.value)}
                        />
                    </label>
                </div>

                <div>
                    <input
                        className='btn'
                        type='submit'
                        name='submit'
                        value='Add Contract'
                    />
                </div>
            </form>
        </div>
    );
}

export default AddContract;
