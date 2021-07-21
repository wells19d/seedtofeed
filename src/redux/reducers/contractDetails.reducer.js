const contractDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CONTRACT_DETAILS':
            return action.payload;
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
}

export default contractDetailsReducer;