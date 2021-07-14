const defaultState = {
    contract_error: null,
    contract_success: null
 }
 const bushelReducer = (state = defaultState, action) => {
    switch (action.type) {
      case 'BUSHEL_CONTRACT_FAILED':
        return {
           ...state,
           contract_success: null,
           contract_error: action.payload
        };
      case 'BUSHEL_CONTRACT_SUCCESS':
       return {
          ...state,
          contract_error: null,
          contract_success: action.payload
       };
      default:
        return state;
    }
  };
  
  export default bushelReducer;
  