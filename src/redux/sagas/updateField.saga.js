import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateField(action){
    try {
        const response = yield axios.put(`/api/field/update/${action.payload.fieldID}`, action.payload.data) // How is this coming in to get both a body to send and params to use???
        yield put({ type: 'FETCH_FIELD_LIST', payload: INSERT }) // Change INSERT to user ID. Cannot remember how to do so at the moment.
        yield put({ type: 'FETCH_FIELD_DETAILS', payload: INSERT }) // Change INSERT to user ID. Cannot remember how to do so at the moment.
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* updateFieldSaga(){
    yield takeEvery('UPDATE_FIELD', updateField);
}

export default updateFieldSaga;