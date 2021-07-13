import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deleteNIR(action) {
    try {
        const response = yield axios.delete(`/api/field/delete_NIR/${action.payload.NIRID}`)
        yield put({ type: 'FETCH_FIELD_NIR', payload: action.payload.fieldID })
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* deleteNIRSaga(){
    yield takeEvery('DELETE_NIR', deleteNIR);
}

export default deleteNIRSaga;