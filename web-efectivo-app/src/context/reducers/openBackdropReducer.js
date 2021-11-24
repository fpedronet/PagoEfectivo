const initialState  = {
    open : false
};

const openBackdropReducer = (state = initialState, action) => {
    switch(action.type) {
        case "OPEN_BACKDROP" :
            return {
                ...state,
                open : action.open
            };
        default : 
            return state;
    }
}

export default openBackdropReducer;