const uploadReducer = (state = [], action) => {
    if (action.type === 'SET_UPLOADS') {
      // clear uploads and set to a new list (action.payload)
      return [...action.payload]
    }
    return state;
  };
  
  // uploads will be on the redux state at:
  // state.uploads
  export default uploadReducer;