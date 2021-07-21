import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

//this saga will be needed to 
function* postContract(action) {
   try {
      const config = {
         headers: {
            'Content-Type': 'application/json',
            'Authorization': action.api_key,
         }
      };

      const response = yield axios.post('https://router.translator.bushelops.com/api/v1/push',
         {
            data: [{
               "update-contracts": {
                  "contracts": [action.payload]
               }
            }]
         }, config);
      console.log(response);

      yield put({ type: 'BUSHEL_CONTRACT_SUCCESS', payload: 'Bushel Contract Sync returned successfully!' });
   } catch (error) {
      console.log(error);
      yield put({ type: 'BUSHEL_CONTRACT_FAILED', payload: 'Bushel Contract Sync failed.' });
   }
}

function* bushelSaga() {
   yield takeLatest('BUSHEL_CONTRACT_POST', postContract);
}

export default bushelSaga;
