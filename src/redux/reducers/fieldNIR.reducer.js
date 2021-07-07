const fieldNIRReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_NIR':
            return action.payload;
        default: return state;
    }
}

export default fieldNIRReducer;