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
  const contracts = useSelector((store) => store.contractListReducer); // To grab the stored information from the contract to DOM
  const history = useHistory();

  let params = useParams(); // To grab the params from the react router

  let fieldID = params.id; // for setting up the use params

  //this component should provide the number of contracts for a field.
  //from store: contract reducer for all contracts is an array.

  //filter by fieldID for a list of contracts on a field:
  const fieldContract = contracts.filter(
    (contract) => contract.field_id === fieldID
  );

  //number of contracts for the field:
  const contractCount = fieldContract.length;

  return (
    <div>
      <p>contractCount</p>
    </div>
  );
}

export default ContractDB;
