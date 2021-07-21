const fieldListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FIELD_LIST':
      return action.payload;
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default fieldListReducer;
