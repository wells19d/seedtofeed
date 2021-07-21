import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addTransaction(action) {
    try {
        const response = yield axios.post(`/api/field/create_transaction`, action.payload)
        yield put({ type: 'FETCH_CONTRACT_LIST', payload: action.payload.fieldID })
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* addTransactionSaga() {
    yield takeEvery('SET_TRANSACTION', addTransaction);
}

export default addTransactionSaga;