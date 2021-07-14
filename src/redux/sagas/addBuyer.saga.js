import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addBuyer(action) {
    console.log(action.payload);
    try {
        console.log(action.payload);
        const response = yield axios.post(`/api/user/addBuyer`, action.payload)
        console.log(action.payload);
        yield put({ type: 'FETCH_FIELD_LIST', payload: action.payload}) // Change INSERT to user ID. Cannot remember how to do so at the moment.
    } catch (error) {
        console.log(action.payload);
        console.log('User get request failed', error);
    }
    console.log(action.payload);
}

function* addBuyerSaga() {
    yield takeEvery('ADD_PROSPECTIVE_BUYER', addBuyer);
}

export default addBuyerSaga;