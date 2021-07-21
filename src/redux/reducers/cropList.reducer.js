const cropListReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_CROP_LIST':
      return action.payload;
    case 'LOGOUT':
      return [];
    default:
      return state;
  }
};

export default cropListReducer;
