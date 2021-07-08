const contractStatusReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CONTRACT_STATUS':
            return action.payload;
        default:
            return state;
    }
}

export default contractStatusReducer;