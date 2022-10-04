import {
    CHANGE_ARTIST_NAME, CLEAR_ARTISTS_REDUCER, CREATE_ARTISTS_FAILURE, CREATE_ARTISTS_REQUEST, CREATE_ARTISTS_SUCCESS,
    GET_ARTISTS_FAILURE,
    GET_ARTISTS_REQUEST,
    GET_ARTISTS_SUCCESS,
} from "../actions/artistsActions";

const initialState = {
    artists: [],
    artistName: "",
    artistsLoading: false,
    artistsError: null,
};

const reducer = (state = initialState, actions) => {
    switch(actions.type) {
        case CHANGE_ARTIST_NAME:
            return {...state, artistName: actions.name};
        case CLEAR_ARTISTS_REDUCER:
            return initialState;

        case GET_ARTISTS_REQUEST:
            return {...state, artistsLoading: true, artistsError: null};
        case GET_ARTISTS_SUCCESS:
            return {...state, artistsLoading: false, artistsError: null, artists: actions.artists};
        case GET_ARTISTS_FAILURE:
            return {...state, artistsLoading: false, artistsError: actions.error};

        case CREATE_ARTISTS_REQUEST:
            return {...state, artistsLoading: true, artistsError: null};
        case CREATE_ARTISTS_SUCCESS:
            return {...state, artistsLoading: false, artistsError: null};
        case CREATE_ARTISTS_FAILURE:
            return {...state, artistsLoading: false, artistsError: actions.error};

        default:
            return state;
    }
};

export default reducer;