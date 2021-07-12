const transactionTypesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_TRANSACTION_TYPES':
            return [action.payload];
        default:
            return state;
    }
}

export default transactionTypesReducer;