import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateField(action) {
  try {
    const response = yield axios.put(
      `/api/field/update/${action.payload.fieldID}`,
      action.payload
    );
    yield put({ type: 'FETCH_FIELD_LIST', payload: response.data });
    yield put({ type: 'FETCH_FIELD_DETAILS', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* updateFieldSaga() {
  yield takeEvery('UPDATE_FIELD', updateField);
}

export default updateFieldSaga;
