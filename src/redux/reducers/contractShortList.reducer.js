const contractShortListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONTRACT_SHORTLIST':
            return action.payload;
        default:
            return state;
    }
}

export default contractShortListReducer;