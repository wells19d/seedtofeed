import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addNIR(action) {
    try {
        const response = yield axios.post(`/api/field/create_NIR`, action.payload)
        yield put({ type: 'FETCH_FIELD_NIR', payload: action.payload.fieldID }) // Change INSERT to field ID. Cannot remember how to do so at the moment.
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* addNIRSaga() {
    yield takeEvery('SET_NIR', addNIR);
}

export default addNIRSaga;