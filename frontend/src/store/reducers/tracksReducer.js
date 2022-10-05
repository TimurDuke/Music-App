import {
    CLEAR_TRACKS_REDUCER, CREATE_TRACK_FAILURE, CREATE_TRACK_REQUEST, CREATE_TRACK_SUCCESS,
    GET_TRACKS_FAILURE,
    GET_TRACKS_REQUEST,
    GET_TRACKS_SUCCESS,
} from "../actions/tracksActions";

const initialState = {
    tracks: [],
    tracksLoading: false,
    tracksError: null,
};

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case CLEAR_TRACKS_REDUCER:
            return initialState;

        case GET_TRACKS_REQUEST:
            return {...state, tracksLoading: true, tracksError: null};
        case GET_TRACKS_SUCCESS:
            return {
                ...state,
                tracksLoading: false,
                tracksError: null,
                tracks: actions.tracks,
            };
        case GET_TRACKS_FAILURE:
            return {...state, tracksLoading: false, tracksError: actions.error};

        case CREATE_TRACK_REQUEST:
            return {...state, tracksLoading: true, tracksError: null};
        case CREATE_TRACK_SUCCESS:
            return {...state, tracksLoading: false, tracksError: null};
        case CREATE_TRACK_FAILURE:
            return {...state, tracksLoading: false, tracksError: actions.error};

        default:
            return state;
    }
};

export default reducer;