import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// this saga is get api JSON info from the stream table
function* fetchStreams() {
  try {
    yield put({ type: 'FETCHING_STREAMS_START' });
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield axios.get('/api/stream/', config);
    yield put({ type: 'SET_STREAMS', payload: response.data });
  } catch (error) {
    console.log('Stream get request failed', error);
  }
  yield put({ type: 'FETCHING_STREAMS_COMPLETE' });
}

function* streamSaga() {
  yield takeLatest('FETCH_STREAMS', fetchStreams);
}

export default streamSaga;
