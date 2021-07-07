import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* cropList(action){
    try {
        const response = yield axios.get('/api/field/cropList')
        yield put({ type: 'SET_CROP_LIST', payload: response.data})
    } catch (error) {
        console.log('User get request failed', error);
    }
}

function* cropListSaga() {
    yield takeEvery('FETCH_CROP_LIST', cropList)
}

export default cropListSaga;