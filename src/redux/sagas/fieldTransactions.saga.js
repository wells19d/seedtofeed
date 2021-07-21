import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fieldTransactions(action) {
  try {
    const response = yield axios.get(
      `/api/field/transactions/${action.payload}`
    );
    yield put({ type: 'SET_FIELD_TRANSACTIONS', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* fieldTransactionsSaga() {
  yield takeEvery('FETCH_FIELD_TRANSACTIONS', fieldTransactions);
}

export default fieldTransactionsSaga;
