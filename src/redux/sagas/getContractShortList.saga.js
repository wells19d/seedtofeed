import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* contractShortList() {
    try {
        const response = yield axios.get(`/api/contract/getContractShortList`);
        yield put({ type: 'SET_CONTRACT_SHORTLIST', payload: response.data })
    } catch (error) {
        console.log('User get contract shortlist request failed', error);
    }
}

function* buyerContractShortList() {
    try {
        const response = yield axios.get(`/api/contract/getBuyerContractShortList`);
        yield put({ type: 'SET_CONTRACT_SHORTLIST', payload: response.data })
    } catch (error) {
        console.log('User get contract shortlist request failed', error);
    }
}

function* contractShortListSaga() {
    yield takeEvery('FETCH_CONTRACT_SHORTLIST', contractShortList);
    yield takeEvery('FETCH_BUYER_CONTRACT_SHORTLIST', buyerContractShortList);
}

export default contractShortListSaga;