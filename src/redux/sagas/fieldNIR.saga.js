import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fieldNIR(action) {
    try {
        const response = yield axios.get(`/api/field/NIR/${action.payload}`)
        yield put({ type: 'SET_NIR', payload: response.data })
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* fieldNIRSaga() {
    yield takeEvery('FETCH_FIELD_NIR', fieldNIR);
}

export default fieldNIRSaga;