import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* deleteField(action){
    try {
        const response = yield axios.delete(`/api/field/delete_field/${action.payload}`)
        yield put({ type: 'FETCH_FIELD_LIST', payload: INSERT }) // Change INSERT to user ID. Cannot remember how to do so at the moment.
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* deleteFieldSaga(){
    yield takeEvery('DELETE_FIELD', deleteField);
}

export default deleteFieldSaga;