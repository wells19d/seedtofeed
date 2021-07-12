import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deleteField(action) {
    try {
        yield axios.delete(`/api/field/delete_field/${action.payload}`);
        //refresh field list
        yield put({ type: 'FETCH_FIELD_LIST' });
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* deleteFieldSaga() {
    yield takeEvery('DELETE_FIELD', deleteField);
}

export default deleteFieldSaga;