const fieldListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FIELD_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default fieldListReducer;