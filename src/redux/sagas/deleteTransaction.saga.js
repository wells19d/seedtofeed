import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deleteTransaction(action) {
    try {
        const response = yield axios.delete(`/api/field/delete_transaction/${action.payload.transactionID}`) // This route does not yet exist.
        yield put({ type: 'FETCH_FIELD_TRANSACTIONS', payload: action.payload.fieldID }) // do we need a payload for a delete?
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* deleteTransactionSaga(){
    yield takeEvery('DELETE_TRANSACTION', deleteTransaction);
}

export default deleteTransactionSaga;