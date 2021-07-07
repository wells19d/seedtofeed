const contractListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONTRACT_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default contractListReducer;