const streamsReducer = (state = { is_loading: false, streams: [] }, action) => {
    switch (action.type) {
       case 'SET_STREAMS':
          return {
             ...state,
             streams: action.payload
          }
       case 'FETCHING_STREAMS_START':
          return {
             ...state,
             is_loading: true
          }
       case 'FETCHING_STREAMS_COMPLETE':
          return {
             ...state,
             is_loading: false
          }
       default:
          return state;
    }
 };
 
 export default streamsReducer;
 