import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';

import fieldListReducer from './fieldList.reducer';
import fieldDetailsReducer from './fieldDetails.reducer';
import fieldTransactionsReducer from './fieldTransactions.reducer';
import fieldNIRReducer from './fieldNIR.reducer';
import cropListReducer from './cropList.reducer';
import contractListReducer from './contractList.reducer';
import contractDetailsReducer from './contractDetails.reducer';
import contractStatusReducer from './contractStatus.reducer';
import transactionTypesReducer from './transactionTypes.reducer';
import uploadReducer from './uploadReducer';


import userListReducer from './userList.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in

  fieldListReducer,
  fieldDetailsReducer,
  fieldTransactionsReducer,
  fieldNIRReducer,
  cropListReducer,
  contractListReducer,
  contractDetailsReducer,
  contractStatusReducer,
  transactionTypesReducer,
  userListReducer,
  uploadReducer,
});

export default rootReducer;
