import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* userList(action) {
  try {
    const response = yield axios.get(`/api/user/userList/`);
    yield put({ type: 'SET_USER_LIST', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userListSaga() {
  yield takeEvery('FETCH_USER_LIST', userList);
}

export default userListSaga;
