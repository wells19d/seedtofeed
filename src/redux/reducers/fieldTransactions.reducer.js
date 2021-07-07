const fieldTransactionsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FIELD_TRANSACTIONS':
            return action.payload;
        default:
            return state;
    }
}

export default fieldTransactionsReducer;