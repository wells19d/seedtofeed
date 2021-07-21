import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addNIR(action) {
  try {
    const response = yield axios.post(`/api/field/create_NIR`, action.payload);
    yield put({ type: 'FETCH_FIELD_NIR', payload: action.payload.field_id });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* addNIRSaga() {
  yield takeEvery('ADD_NIR', addNIR);
}

export default addNIRSaga;
