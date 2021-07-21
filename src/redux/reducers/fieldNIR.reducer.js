const fieldNIRReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_NIR':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default fieldNIRReducer;