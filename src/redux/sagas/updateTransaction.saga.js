import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateTransaction(action){
    try {
        const response = yield axios.put(`/api/field/update_transaction/${action.payload.fieldID}`, action.payload.data) // How is this coming in to get both a body to send and params to use??? Also, this route does not yet exist.
        yield put({ type: 'FETCH_FIELD_TRANSACTIONS', payload: INSERT }) // Change INSERT to user ID. Cannot remember how to do so at the moment.
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* updateTransactionSaga(){
    yield takeEvery('UPDATE_TRANSACTION', updateTransaction);
}

export default updateTransactionSaga;