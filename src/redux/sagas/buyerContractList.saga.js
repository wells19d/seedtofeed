import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* buyerContractList() {
    try {
        const response = yield axios.get(`/api/contract/buyerGetAll`)
            console.log(response.data)
        yield put({ type: 'SET_CONTRACT_LIST', payload: response.data })
            console.log(response.data)
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* buyerContractListSaga() {
    yield takeEvery('FETCH_BUYER_CONTRACT_LIST', buyerContractList);
}

export default buyerContractListSaga;