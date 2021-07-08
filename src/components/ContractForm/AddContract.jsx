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

    console.log('Here is the contract status list', contractStatus);
    console.log('Here is the crop list', crops);


    useEffect(() => {
        dispatch({
            type: 'FETCH_CROP_LIST',
            type: 'FETCH_CONTRACT_STATUS'
        })
    }, [])

    // LOCAL STATE
    const [heading, setHeading] = useState('Add Contract');

    const [commodity, setCommodity] = useState('');
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



    // ADD A CONTRACT
    // will also grab the user info.
    const addContract = (event) => {
        event.preventDefault();

        dispatch({
            type: 'SET_CONTRACT', // dispatch to the addContract.saga
            payload: {
                user_field_id: user_field_id, //have to review how this is coming in?
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
                contractHandler: contactHandler,
                userID: user.id //to be used in the addContract.saga

            }
        });
    }; // end addContract

    return (
        <div>
            <form className='add-contract' onSubmit={addContract}>
                <h2>{heading}</h2>
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
                            <option hidden>Select</option>
                            {crops.map((crop) => {
                                console.log('croptype:', crop);
                                return (
                                    <option key={crop.id} value={crop.crop_type}>
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
                            <option hidden>Select</option>
                            {contractStatus.map((status) => {
                                console.log('contract status:', status);
                                return (
                                    <option key={status.id} value={status.name}>
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
                        value='Add Field'
                    />
                </div>
            </form>
        </div>
    );
}

export default AddContract;
