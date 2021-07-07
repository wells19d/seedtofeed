import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addContract(action){
    try {
        const response = yield axios.post(`/api/contract/add_contract`, action.payload)
        yield put({ type: 'FETCH_CONTRACT_LIST', payload: INSERT }) // Change INSERT to user ID. Cannot remember how to do so at the moment.
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* addContractSaga(){
    yield takeEvery('SET_CONTRACT', addContract);
}

export default addContractSaga;