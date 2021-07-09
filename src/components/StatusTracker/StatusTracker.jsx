import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../App/App.css';

function StatusTracker(params){

    const fieldID = params.fieldID;

    const history = useHistory();
    const dispatch = useDispatch();

    const statuses = useSelector(store => store.transactionTypesReducer);

    const details = useSelector(store => store.fieldDetailsReducer);

    const detail = details[0];

    useEffect(() => {
        dispatch({
          type: "FETCH_FIELD_DETAILS",
          payload: fieldID
        })

        dispatch({
            type: 'FETCH_TRANSACTION_TYPES'
        })


      }, [])
      
    return (
        <div>
        {/* <p>{JSON.stringify(statuses)}</p> */}
        <p>{JSON.stringify(detail)}</p>

        {statuses.map(status => {
            return (
                <div key={status.id}>
                    {status.name === detail?.field_status ? <span className="Current_Status"> {` ->`} {status.name} <img src={status.workflow_images}/> </span> : <span> {status.name} </span>}
                </div>
            )
        })}

            <p>Contract Status: {detail?.name}</p>
        </div>
    )
}

export default StatusTracker;



        /* {statuses.map(status => {
            return (
                <div key={status.id}>
                    {status.name === detail?.field_status && <span> {status.name} <img src={status.workflow_images}/></span>}
                </div>
            )
        })} */