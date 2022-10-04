import {
    CHANGE_ALBUM_TITLE, CLEAR_ALBUMS_REDUCER,
    GET_ALBUMS_FAILURE,
    GET_ALBUMS_REQUEST,
    GET_ALBUMS_SUCCESS,
} from "../actions/albumsActions";

const initialState = {
    albums: [],
    albumTitle: "",
    albumsLoading: false,
    albumsError: null,
};

const reducer = (state = initialState, actions) => {
    switch(actions.type) {
        case CHANGE_ALBUM_TITLE:
            return {...state, albumTitle: actions.title};
        case CLEAR_ALBUMS_REDUCER:
            return initialState;

        case GET_ALBUMS_REQUEST:
            return {...state, albumsLoading: true, albumsError: null};
        case GET_ALBUMS_SUCCESS:
            return {
                ...state,
                albumsLoading: false,
                albumsError: null,
                albums: actions.albums,
            };
        case GET_ALBUMS_FAILURE:
            return {...state, albumsLoading: false, albumsError: actions.error};

        default:
            return state;
    }
};

export default reducer;