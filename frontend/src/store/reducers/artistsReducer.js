import {
    GET_ALBUMS_FAILURE,
    GET_ALBUMS_REQUEST,
    GET_ALBUMS_SUCCESS,
    GET_ARTISTS_FAILURE,
    GET_ARTISTS_REQUEST,
    GET_ARTISTS_SUCCESS
} from "../actions/artistsActions";

const initialState = {
    artists: [],
    albums: [],
    loading: false,
    artistsError: null,
    albumsError: null,
};

const artistsReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case GET_ARTISTS_REQUEST:
            return {...state, loading: true, artistsError: null};
        case GET_ARTISTS_SUCCESS:
            return {...state, loading: false, artistsError: null, artists: actions.artists};
        case GET_ARTISTS_FAILURE:
            return {...state, loading: false, artistsError: actions.error};

        case GET_ALBUMS_REQUEST:
            return {...state, loading: true, albumsError: null};
        case GET_ALBUMS_SUCCESS:
            return {...state, loading: false, albumsError: null, albums: actions.albums};
        case GET_ALBUMS_FAILURE:
            return {...state, loading: false, albumsError: actions.error};

        default:
            return state;
    }
};

export default artistsReducer;