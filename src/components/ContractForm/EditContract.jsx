import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HashRouter as Router, Route, useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function EditContract() {
    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();

    const contractID = params.contractID
    console.log('here is the contract ID', contractID)

    useEffect(() => {
        dispatch({
            type: 'FETCH_CROP_LIST',
        })
        dispatch({
            type: 'FETCH_CONTRACT_STATUS',
        })
        dispatch({
            type: 'FETCH_CONTRACT_LIST',
            dispatch: contractID
        })
    }, [])

    //to be sent along with the contract obj
    const user = useSelector(store => store.user.username);
    const contractStatus = useSelector(store => store.contractStatusReducer);
    const contract = useSelector(store => store.contractListReducer);
    const crops = useSelector((store) => store.cropListReducer);

    console.log('Here is the contract status list', contractStatus);
    console.log('Here is the crop list', crops);

    // CURRENT CONTRACT TO BE EDITED
    const foundContract = contract.find((contract) => {
        console.log('here is the current contract:', contract);
        return contract.contractID === Number(params.contractID);
    });

    // LOCAL STATE
    const [commodity, setCommodity] = useState(foundContract?.commodity);
    const [openStatus, setOpenStatus] = useState(foundContract?.open_status);
    const [bushel_uid, setBushel_uid] = useState(foundContract?.bushel_uid);
    const [quantityFulfilled, setQuantityFulfilled] = useState(foundContract?.quantity_fulfilled);
    const [price, setPrice] = useState(foundContract?.price);
    const [contractQuantity, setContractQuantity] = useState(foundContract?.contract_quantity);
    const [containerSerial, setContainerSerial] = useState(foundContract?.container_serial);
    const [contractHandler, setContractHandler] = useState(foundContract?.contract_handler);

    // for NIR analysis
    const [protein, setProtein] = useState(foundContract?.protein);
    const [oil, setOil] = useState(foundContract?.oil);
    const [moisture, setMoisture] = useState(foundContract?.moisture);
    // const [aminoAcids, setAminoAcids] = useState(foundContract.amino_acids);
    // const [energy, setEnergy] = useState(foundContract.energy);

    //obtain field status of field the contract is being edited
    const transType = useSelector((store) => store.fieldTransactionsReducer)
    const fieldTrans = transType[0].transaction_type;



    // EDIT A CONTRACT
    // will also grab the user info.
    const editContract = (event) => {
        event.preventDefault();

        if (user_field_id.length === 0, commodity.length === 0, contractQuantity === 0, containerSerial.length === 0, contractHandler.length === 0 ) {
            return alert('Fill in required fields') // Can change alert and which fields are required
          }
          else {


            alert('Contract has been updated');

           dispatch({
            type: 'UPDATE_CONTRACT', // dispatch to the updatecontract.saga
            payload: {
                contractID: foundContract.contractID, //verify what id we need to dispatch here
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
                transaction_type: fieldTrans

                }
            });

            history.push(`/contract`);
        }
    }; // end addContract

    return (
        <div>
            <form className='edit-contract' onSubmit={editContract}>
                <h1>Edit Contract</h1>

                <div>
                    <label htmlFor='contract-handler'>
                        Contract Handler:
                        <input
                            placeholder='foundContract?.contract_handler'
                            type='text'
                            name='Contract Handler'
                            value={contractHandler}
                            required
                            onChange={(event) => setContractHandler(event.target.value)}
                        />
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
                            {crops.map((crop) => {
                                <option>{crop.crop_type}</option>
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
                            {contractStatus.map((status) => {
                                <option>{status.name}</option>
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

                {/* <div>
                    <label htmlFor='amino-acids'>
                        Amino Acids:
                        <input
                            placeholder='Amino Acids'
                            type='number' min="0"
                            name='amino-acids'
                            value={aminoAcids}
                            required
                            onChange={(event) => setAminoAcids(event.target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor='energy'>
                        Energy:
                        <input
                            placeholder='Energy'
                            type='number' min="0"
                            name='energy'
                            value={energy}
                            required
                            onChange={(event) => setEnergy(event.target.value)}
                        />
                    </label>
                </div> */}

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
                    <input
                        className='btn'
                        type='submit'
                        name='submit'
                        value='Update Contract'
                    />
                </div>
            </form>
        </div>
    );
}

export default EditContract;