import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* transactionTypes(action) {
  try {
    const response = yield axios.get('/api/field/transactionTypes');
    yield put({ type: 'SET_TRANSACTION_TYPES', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* transactionTypesSaga() {
  yield takeEvery('FETCH_TRANSACTION_TYPES', transactionTypes);
}

export default transactionTypesSaga;
