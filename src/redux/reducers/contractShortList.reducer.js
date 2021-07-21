const contractShortListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONTRACT_SHORTLIST':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default contractShortListReducer;