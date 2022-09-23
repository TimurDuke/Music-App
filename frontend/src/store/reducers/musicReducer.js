import {
    CLEAR_STATE,
    GET_ALBUMS_FAILURE,
    GET_ALBUMS_REQUEST,
    GET_ALBUMS_SUCCESS,
    GET_ARTISTS_FAILURE,
    GET_ARTISTS_REQUEST,
    GET_ARTISTS_SUCCESS,
    GET_TRACKS_FAILURE,
    GET_TRACKS_REQUEST,
    GET_TRACKS_SUCCESS
} from "../actions/musicActions";

const initialState = {
    artists: [],
    albums: [],
    tracks: [],
    tracksHistory: [],
    artistName: '',
    albumTitle: '',
    artistsLoading: false,
    albumsLoading: false,
    tracksLoading: false,
    tracksHistoryLoading: false,
    artistsError: null,
    albumsError: null,
    tracksError: null,
};

const musicReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case CLEAR_STATE:
            return initialState;

        case GET_ARTISTS_REQUEST:
            return {...state, artistsLoading: true, artistsError: null};
        case GET_ARTISTS_SUCCESS:
            return {...state, artistsLoading: false, artistsError: null, artists: actions.artists};
        case GET_ARTISTS_FAILURE:
            return {...state, artistsLoading: false, artistsError: actions.error};

        case GET_ALBUMS_REQUEST:
            return {...state, albumsLoading: true, albumsError: null};
        case GET_ALBUMS_SUCCESS:
            return {
                ...state,
                tracksLoading: false,
                albumsError: null,
                albums: actions.albums,
                artistName: actions.albums[0].artist.name,
            };
        case GET_ALBUMS_FAILURE:
            return {...state, albumsLoading: false, albumsError: actions.error};

        case GET_TRACKS_REQUEST:
            return {...state, tracksLoading: true, tracksError: null};
        case GET_TRACKS_SUCCESS:
            return {
                ...state,
                tracksLoading: false,
                tracksError: null,
                tracks: actions.tracks,
                albumTitle: actions.tracks[0].album.title,
                artistName: actions.tracks[0].album.artist.name,
            };
        case GET_TRACKS_FAILURE:
            return {...state, tracksLoading: false, tracksError: actions.error};

        default:
            return state;
    }
};

export default musicReducer;