import {useToastError, useToastInfo, useToastWarn} from "../../hooks";
import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";

export const CLEAR_TRACKS_REDUCER = 'CLEAR_TRACKS_REDUCER';
export const clearTracksReducer = () => ({type: CLEAR_TRACKS_REDUCER});

export const GET_TRACKS_REQUEST = 'GET_TRACKS_REQUEST';
export const GET_TRACKS_SUCCESS = 'GET_TRACKS_SUCCESS';
export const GET_TRACKS_FAILURE = 'GET_TRACKS_FAILURE';

const getTracksRequest = () => ({type: GET_TRACKS_REQUEST});
const getTracksSuccess = tracks => ({type: GET_TRACKS_SUCCESS, tracks});
const getTracksFailure = error => ({type: GET_TRACKS_FAILURE, error});

export const getTracks = albumId => {
    return async dispatch => {
        try {
            dispatch(getTracksRequest());

            const {data} = await axiosApi.get('/tracks?album=' + albumId);
            if (data) {
                dispatch(getTracksSuccess(data));
            }
        } catch (e) {
            if (e.response) {
                useToastError(e.response.data.error);

                if (e.response.status === 401) {
                    useToastWarn('You need to login!');
                }
                dispatch(getTracksFailure(e.response.data));
            } else {
                dispatch(getTracksFailure({global: 'No internet'}));
            }
        }
    };
};

export const CREATE_TRACK_REQUEST = 'CREATE_TRACK_REQUEST';
export const CREATE_TRACK_SUCCESS = 'CREATE_TRACK_SUCCESS';
export const CREATE_TRACK_FAILURE = 'CREATE_TRACK_FAILURE';

const createTrackRequest = () => ({type: CREATE_TRACK_REQUEST});
const createTrackSuccess = () => ({type: CREATE_TRACK_SUCCESS});
const createTrackFailure = error => ({type: CREATE_TRACK_FAILURE, error});

export const createTrack = trackData => {
    return async dispatch => {
        try {
            dispatch(createTrackRequest());

            await axiosApi.post('/tracks', trackData);
            await dispatch(createTrackSuccess());
            await dispatch(historyPush('/'));

            useToastInfo('The track has been created, wait for the administration to check.');
        } catch (e) {
            if (e.response && e.response.data) {
                if (!e.response.data.errors) {
                    useToastError('The Artist and Album fields must be filled in.');
                }

                dispatch(createTrackFailure(e.response.data));
            } else {
                dispatch(createTrackFailure({global: 'No internet'}));
            }
        }
    };
};

export const GET_PERSONAL_TRACKS_REQUEST = 'GET_PERSONAL_TRACKS_REQUEST';
export const GET_PERSONAL_TRACKS_SUCCESS = 'GET_PERSONAL_TRACKS_SUCCESS';
export const GET_PERSONAL_TRACKS_FAILURE = 'GET_PERSONAL_TRACKS_FAILURE';

const getPersonalTracksRequest = () => ({type: GET_PERSONAL_TRACKS_REQUEST});
const getPersonalTracksSuccess = tracks => ({type: GET_PERSONAL_TRACKS_SUCCESS, tracks});
const getPersonalTracksFailure = error => ({type: GET_PERSONAL_TRACKS_FAILURE, error});

export const getPersonalTracks = () => {
    return async dispatch => {
        try {
            dispatch(getPersonalTracksRequest());

            const {data} = await axiosApi.get('/tracks/personal');

            if (data) {
                dispatch(getPersonalTracksSuccess(data));
            }
        } catch (e) {
            dispatch(getPersonalTracksFailure(e));
        }
    };
};

export const GET_UNPUBLISH_TRACKS_REQUEST = 'GET_UNPUBLISH_TRACKS_REQUEST';
export const GET_UNPUBLISH_TRACKS_SUCCESS = 'GET_UNPUBLISH_TRACKS_SUCCESS';
export const GET_UNPUBLISH_TRACKS_FAILURE = 'GET_UNPUBLISH_TRACKS_FAILURE';

const getUnpublishTracksRequest = () => ({type: GET_UNPUBLISH_TRACKS_REQUEST});
const getUnpublishTracksSuccess = tracks => ({type: GET_UNPUBLISH_TRACKS_SUCCESS, tracks});
const getUnpublishTracksFailure = error => ({type: GET_UNPUBLISH_TRACKS_FAILURE, error});

export const getUnpublishTracks = () => {
    return async dispatch => {
        try {
            dispatch(getUnpublishTracksRequest());

            const {data} = await axiosApi.get('/tracks/not_publish');

            if (data) {
                dispatch(getUnpublishTracksSuccess(data));
            }
        } catch (e) {
            dispatch(getUnpublishTracksFailure(e));
        }
    };
};