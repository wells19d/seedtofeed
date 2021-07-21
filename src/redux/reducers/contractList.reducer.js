const contractListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CONTRACT_LIST':
      return action.payload;
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default contractListReducer;
