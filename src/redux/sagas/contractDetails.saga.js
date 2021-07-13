import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* contractDetails(action) {
    console.log('here is the current contract ID:', action.payload.contractID);
    
    try {
        const response = yield axios.get(`/api/contract/contractDetails/${action.payload}`) // This route does not yet exist.
        yield put({ type: 'SET_CONTRACT_DETAILS', payload: response.data})
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* contractDetailsSaga(){
    yield takeEvery('FETCH_CONTRACT_DETAILS', contractDetails);
}

export default contractDetailsSaga;