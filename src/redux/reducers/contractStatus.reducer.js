const contractStatusReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CONTRACT_STATUS':
      return action.payload;
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default contractStatusReducer;
