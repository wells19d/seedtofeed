import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* contractList(action) {
    console.log('Here is a list of contracts:', action.payload);
    
    try {
        const response = yield axios.get(`/api/contract/getall/${action.payload}`)
        yield put({ type: 'SET_CONTRACT_LIST', payload: response.data })
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* contractListSaga() {
    yield takeEvery('FETCH_CONTRACT_LIST', contractList);
}

export default contractListSaga;