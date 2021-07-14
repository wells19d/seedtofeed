import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* buyerFieldList() {
    try {
        const response = yield axios.get(`/api/field/buyerFieldList/`)
        yield put({ type: 'SET_FIELD_LIST', payload: response.data })
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* buyerFieldListSaga() {
    yield takeEvery('FETCH_BUYER_FIELD_LIST', buyerFieldList);
}

export default buyerFieldListSaga;