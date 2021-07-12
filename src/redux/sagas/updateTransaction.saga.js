import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateTransaction(action){
    try {
        const response = yield axios.put(`/api/field/update_transaction/`, action.payload)
        yield put({ type: 'FETCH_FIELD_TRANSACTIONS', payload: action.payload.field_id })
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* updateTransactionSaga(){
    yield takeEvery('UPDATE_TRANSACTION', updateTransaction);
}

export default updateTransactionSaga;