import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';

import fieldListSaga from './fieldList.saga';
import fieldDetailsSaga from './fieldDetails.saga';
import fieldTransactionsSaga from './fieldTransactions.saga';
import fieldNIRSaga from './fieldNIR.saga';
import cropListSaga from './cropList.saga';

import contractListSaga from './contractList.saga';
import contractDetailsSaga from './contractDetails.saga';
import contractStatusSaga from './contractStatus.saga';

import addFieldSaga from './addField.saga';
import addTransactionSaga from './addTransaction.saga';
import addNIRSaga from './addNIR.saga';
import addContractSaga from './addContract.saga';

import updateFieldSaga from './updateField.saga';
import updateTransactionSaga from './updateTransaction.saga';
import updateContractSaga from './updateContract.saga';

import deleteFieldSaga from './deleteField.saga';
import deleteTransactionSaga from './deleteTransaction.saga';
import deleteContractSaga from './deleteContract.saga';

import transactionTypesSaga from './transactionTypes.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),

    fieldListSaga(),
    fieldDetailsSaga(),
    fieldTransactionsSaga(),
    fieldNIRSaga(),
    cropListSaga(),

    contractListSaga(),
    contractDetailsSaga(),
    contractStatusSaga(),

    addFieldSaga(),
    addTransactionSaga(),
    addNIRSaga(),
    addContractSaga(),

    updateFieldSaga(),
    updateTransactionSaga(),
    updateContractSaga(),
    // We will need to have a PUT to set a buyer if we want that functionality.

    deleteFieldSaga(),
    deleteTransactionSaga(),
    deleteContractSaga(),
    // Should we have a delete for the NIR???

    transactionTypesSaga(),
  ]);
}
