import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../App/App.css';

function StatusTracker(params){

    const fieldID = params.fieldID;

    const history = useHistory();
    const dispatch = useDispatch();

    //const statuses = useSelector(store => store.transactionTypesReducer);

    const details = useSelector(store => store.fieldDetailsReducer);

    const detail = details[0];

    useEffect(() => {
        dispatch({
          type: "FETCH_FIELD_DETAILS",
          payload: fieldID
        })

        // dispatch({
        //     type: 'FETCH_TRANSACTION_TYPES'
        // })


      }, [])
      
    return (
        <div>
        <p>{JSON.stringify(details)}</p>
        <p>{JSON.stringify(detail)}</p>
        {/* {JSON.stringify(details[0].field_status)} */}

        {/* <div>
            Current Status: {detail.field_status} 
        </div> */}

            <br />
        </div>
    )
}

export default StatusTracker;

/*
        {details.field_status ? 
        statuses.map(status => {
            return (
                <div key={status.id}>
                    {status.name === details[0].field_status ? <span className="Current_Status"> {` ->`} {status.name} </span> : <span> {status.name} </span>}
                </div>
            )
        })
        :
        <span>Loading...<button onClick={() => console.log(details[0].field_status)}>Test</button></span>}
*/