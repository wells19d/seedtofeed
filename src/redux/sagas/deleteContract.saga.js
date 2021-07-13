import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deleteContract(action){
    console.log('Here is the id of the contract to be deleted:', action.payload);
    
    try {
        const response = yield axios.delete(`/api/contract/delete_contract/${action.payload}`)
        yield put({ type: 'FETCH_CONTRACT_LIST' }) 
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* deleteContractSaga(){
    yield takeEvery('DELETE_CONTRACT', deleteContract);
}

export default deleteContractSaga;