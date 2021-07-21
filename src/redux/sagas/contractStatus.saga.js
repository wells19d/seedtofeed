import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* contractStatus(action) {
  try {
    const response = yield axios.get(`/api/contract/contractStatus`);
    yield put({ type: 'SET_CONTRACT_STATUS', payload: response.data });
  } catch (error) {
    console.log('Contract status get request failed', error);
  }
}

function* contractStatusSaga() {
  yield takeEvery('FETCH_CONTRACT_STATUS', contractStatus);
}

export default contractStatusSaga;
