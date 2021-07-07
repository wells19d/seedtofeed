import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addTransaction(action) {
    try {
        const response = yield axios.post(`/api/field/create_transaction`, action.payload)
        yield put({ type: 'FETCH_CONTRACT_LIST', payload: INSERT }) // Change INSERT to user ID. Cannot remember how to do so at the moment.
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* addTransactionSaga() {
    yield takeEvery('SET_TRANSACTION', addTransaction);
}

export default addTransactionSaga;