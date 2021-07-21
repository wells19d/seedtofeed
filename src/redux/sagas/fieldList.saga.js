import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fieldList() {
    try {
        const response = yield axios.get(`/api/field/fieldList/`)
        yield put({ type: 'SET_FIELD_LIST', payload: response.data })
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* fieldListSaga() {
    yield takeEvery('FETCH_FIELD_LIST', fieldList);
}

export default fieldListSaga;