import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useReduxStore from '../../hooks/useReduxStore';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { useSelector } from 'react-redux';

import '../App/App.css';

function ContractDB() {

    const dispatch = useDispatch();
    const store = useReduxStore(); // To grab the stored information from the contract to DOM
    const history = useHistory();

    //this component should provide the number of contracts, the status, contract_quantity

    return (
        <>
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {/* grab the table info */}
            </tbody>

        </table>
        
        </>
    );
}


export default ContractDB;