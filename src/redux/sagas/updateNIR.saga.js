import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateNIR(action) {
    try {
        const response = yield axios.put(`/api/field/update_NIR`, action.payload)
        yield put({ type: 'FETCH_FIELD_NIR', payload: action.payload.field_id })
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* updateNIRSaga() {
    yield takeEvery('UPDATE_NIR', updateNIR);
}

export default updateNIRSaga;