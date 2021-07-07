const cropListReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CROP_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default cropListReducer;