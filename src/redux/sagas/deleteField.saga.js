import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deleteField(action){
    try {
        const response = yield axios.delete(`/api/field/delete_field/${action.payload}`)
        yield put({ type: 'FETCH_FIELD_LIST', payload: INSERT }) // do we need a payload for a delete?
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* deleteFieldSaga(){
    yield takeEvery('DELETE_FIELD', deleteField);
}

export default deleteFieldSaga;