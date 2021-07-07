import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateContract(action){
    try {
        const response = yield axios.put(`/api/contract/update_contract/${action.payload.contractID}`, action.payload.data) // How is this coming in to get both a body to send and params to use???
        yield put({ type: 'FETCH_CONTRACT_LIST', payload: INSERT }) // Change INSERT to user ID. Cannot remember how to do so at the moment.
        yield put({ type: 'FETCH_CONTRACT_DETAILS', payload: INSERT }) // Change INSERT to user ID. Cannot remember how to do so at the moment.
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* updateContractSaga(){
    yield takeEvery('UPDATE_CONTRACT', updateContract);
}

export default updateContractSaga;