const fieldDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_FIELD_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default fieldDetailsReducer;