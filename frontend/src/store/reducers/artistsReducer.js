const initialState = {
    artists: [],
    loading: false,
    error: null,
};

const artistsReducer = (state = initialState, actions) => {
    switch(actions.type) {
        default:
            return state;
    }
};

export default artistsReducer;