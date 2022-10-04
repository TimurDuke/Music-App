import {useToastError, useToastWarn} from "../../hooks";
import axiosApi from "../../axiosApi";

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