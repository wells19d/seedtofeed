import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fieldDetails(action) {

    // console.log('The ID of this field is:', action.payload);
    
    try {
        const response = yield axios.get(`/api/field/fieldDetails/${action.payload}`)
        yield put({ type: 'SET_FIELD_DETAILS', payload: response.data})
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* fieldDetailsSaga() {
    yield takeEvery('FETCH_FIELD_DETAILS', fieldDetails);
}

export default fieldDetailsSaga;