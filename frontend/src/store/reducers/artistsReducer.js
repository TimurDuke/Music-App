import {GET_ARTISTS_FAILURE, GET_ARTISTS_REQUEST, GET_ARTISTS_SUCCESS} from "../actions/artistsActions";

const initialState = {
    artists: [],
    loading: false,
    error: null,
};

const artistsReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case GET_ARTISTS_REQUEST:
            return {...state, loading: true, error: null};
        case GET_ARTISTS_SUCCESS:
            return {...state, loading: false, error: null, artists: actions.artists};
        case GET_ARTISTS_FAILURE:
            return {...state, loading: false, error: actions.error};

        default:
            return state;
    }
};

export default artistsReducer;