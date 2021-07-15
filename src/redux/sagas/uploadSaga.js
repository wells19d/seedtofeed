import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// upload a file (from filestack) to the backend
function* sendUpload(action) {
  console.log('Upload saga', action.payload);
  try {
    // clear any alerts that may be in there already
    yield put({type: 'CLEAR_ALERT'});
    console.log('Upload saga', action.payload);
    yield axios.post('/api/upload', action.payload);
    console.log('Upload saga', action.payload);
    // dispatch an alert that the upload was successful
    yield put({type: 'SET_ALERT', payload: { message: 'Upload Successful', alert: 'alert-success' }});
    console.log('Upload saga', action.payload);
    // refresh list of uploads
    yield put({type: 'FETCH_UPLOADS'});
  } catch (error) {
    // dispatch an error that the upload was rejected
    yield put({type: 'SET_ALERT', payload: { message: 'Error uploading file', alert: 'alert-error' }});
    console.log('Error with file upload:', error);
  }
}

// Refresh the global list of uploads from the database
function* fetchUploads() {
  try {
    const response = yield axios.get('/api/upload');
    // add the upload to the redux store
    yield put({type: 'SET_UPLOADS', payload: response.data});
  } catch (error) {
    // dispatch an error that the upload was rejected
    yield put({type: 'SET_ALERT', payload: { message: 'Error retrieving uploads', alert: 'alert-error' }});
    console.log('Error getting uploads from server:', error);
  }
}

function* uploadSaga() {
  yield takeLatest('SEND_UPLOAD', sendUpload);
  yield takeLatest('FETCH_UPLOADS', fetchUploads);
}

export default uploadSaga;