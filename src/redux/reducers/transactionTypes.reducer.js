const transactionTypesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TRANSACTION_TYPES':
            return action.payload;
        case 'LOGOUT':
            return [];
        default:
            return state;
    }
}

export default transactionTypesReducer;