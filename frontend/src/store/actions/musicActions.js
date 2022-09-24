import axiosApi from "../../axiosApi";
import {toast} from "react-toastify";

export const CLEAR_STATE = 'CLEAR_STATE';

export const clearState = () => ({type: CLEAR_STATE});

export const GET_ARTISTS_REQUEST = 'GET_ARTISTS_REQUEST';
export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const GET_ARTISTS_FAILURE = 'GET_ARTISTS_FAILURE';

const getArtistsRequest = () => ({type: GET_ARTISTS_REQUEST});
const getArtistsSuccess = artists => ({type: GET_ARTISTS_SUCCESS, artists});
const getArtistsFailure = error => ({type: GET_ARTISTS_FAILURE, error});

export const getArtists = () => {
    return async dispatch => {
        try {
            dispatch(getArtistsRequest());
            const {data} = await axiosApi.get('/artists');
            if (data) {
                dispatch(getArtistsSuccess(data));
            }
        } catch (e) {
            dispatch(getArtistsFailure(e));
        }
    };
};

export const GET_ALBUMS_REQUEST = 'GET_ALBUMS_REQUEST';
export const GET_ALBUMS_SUCCESS = 'GET_ALBUMS_SUCCESS';
export const GET_ALBUMS_FAILURE = 'GET_ALBUMS_FAILURE';

const getAlbumsRequest = () => ({type: GET_ALBUMS_REQUEST});
const getAlbumsSuccess = albums => ({type: GET_ALBUMS_SUCCESS, albums});
const getAlbumsFailure = error => ({type: GET_ALBUMS_FAILURE, error});

export const getAlbums = artistId => {
    return async dispatch => {
        try {
            dispatch(getAlbumsRequest());
            const {data} = await axiosApi.get('/albums?artist=' + artistId);

            if (data) {
                dispatch(getAlbumsSuccess(data));
            }
        } catch (e) {
            dispatch(getAlbumsFailure(e));
        }
    };
};

export const GET_TRACKS_REQUEST = 'GET_TRACKS_REQUEST';
export const GET_TRACKS_SUCCESS = 'GET_TRACKS_SUCCESS';
export const GET_TRACKS_FAILURE = 'GET_TRACKS_FAILURE';

const getTracksRequest = () => ({type: GET_TRACKS_REQUEST});
const getTracksSuccess = tracks => ({type: GET_TRACKS_SUCCESS, tracks});
const getTracksFailure = error => ({type: GET_TRACKS_FAILURE, error});

export const getTracks = albumId => {
    return async (dispatch, getState) => {
        try {
            const headers = {
                'Authorization': getState().users.user && getState().users.user.token,
            };

            dispatch(getTracksRequest());

            const {data} = await axiosApi.get('/tracks?album=' + albumId, {headers});
            if (data) {
                dispatch(getTracksSuccess(data));
            }
        } catch (e) {
            if (e.response) {
                if (e.response.status === 401) {
                    toast.warn('You need login!', {
                        position: "top-right",
                        autoClose: 3500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }

                dispatch(getTracksFailure(e.response.data));
            } else {
                dispatch(getTracksFailure({global: 'No internet'}));
            }
        }
    };
};

export const GET_HISTORY_REQUEST = 'GET_HISTORY_REQUEST';
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS';
export const GET_HISTORY_FAILURE = 'GET_HISTORY_FAILURE';

const getHistoryRequest = () => ({type: GET_HISTORY_REQUEST});
const getHistorySuccess = history => ({type: GET_HISTORY_SUCCESS, history});
const getHistoryFailure = error => ({type: GET_HISTORY_FAILURE, error});

export const getHistory = () => {
    return async (dispatch, getState) => {
        try {
            const headers = {
                'Authorization': getState().users.user && getState().users.user.token,
            };
            dispatch(getHistoryRequest());
            const {data} = await axiosApi.get('/track_history', {headers});

            if (data) {
                dispatch(getHistorySuccess(data));
            }
        } catch (e) {
            dispatch(getHistoryFailure(e));
        }
    };
};

export const CREATE_HISTORY_REQUEST = 'CREATE_HISTORY_REQUEST'
export const CREATE_HISTORY_SUCCESS = 'CREATE_HISTORY_SUCCESS'
export const CREATE_HISTORY_FAILURE = 'CREATE_HISTORY_FAILURE'

const createHistoryRequest = () => ({type: CREATE_HISTORY_REQUEST});
const createHistorySuccess= () => ({type: CREATE_HISTORY_SUCCESS});
const createHistoryFailure = error => ({type: CREATE_HISTORY_FAILURE, error});

export const createHistory = data => {
    return async (dispatch, getState) => {
        try {
            const headers = {
                'Authorization': getState().users.user && getState().users.user.token,
            };

            dispatch(createHistoryRequest());

            await axiosApi.post('/track_history', data, {headers});

            dispatch(createHistorySuccess());
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createHistoryFailure(e.response.data));
            } else {
                dispatch(createHistoryFailure({global: 'No internet'}));
            }
        }
    };
};