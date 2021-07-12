import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* updateField(action){
    try {
        console.log('The ID of the updated field is:', action.payload.fieldID);

        const response = yield axios.put(`/api/field/update/${action.payload.fieldID}`, action.payload) // How is this coming in to get both a body to send and params to use???
        yield put({ type: 'FETCH_FIELD_LIST', payload: response.data}) // Change INSERT to user ID. Cannot remember how to do so at the moment.
        // yield put({ type: 'FETCH_FIELD_DETAILS', payload: response.data}) // What is this line doing?
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* updateFieldSaga(){
    yield takeEvery('UPDATE_FIELD', updateField);
}

export default updateFieldSaga;