import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deleteContract(action){
    try {
        const response = yield axios.delete(`/api/contract/delete_contract/${action.payload}`)
        yield put({ type: 'FETCH_CONTRACT_LIST', payload: INSERT }) // Change INSERT to user ID. Cannot remember how to do so at the moment.
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* deleteContractSaga(){
    yield takeEvery('DELETE_CONTRACT', deleteContract);
}

export default deleteContractSaga;