import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateContract(action){
    try {
        const response = yield axios.put(`/api/contract/update_contract/${action.payload.contractID}`, action.payload) 
        yield put({ type: 'FETCH_CONTRACT_LIST', payload: response }) 
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* updateContractSaga(){
    yield takeEvery('UPDATE_CONTRACT', updateContract);
}

export default updateContractSaga;