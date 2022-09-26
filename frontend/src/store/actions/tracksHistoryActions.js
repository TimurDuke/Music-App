import axiosApi from "../../axiosApi";
import {useHeadersAuth, useToastError, useToastInfo, useToastWarn} from "../../hooks";

export const CLEAR_HISTORY_STATE = 'CLEAR_HISTORY_STATE';
export const clearHistoryState = () => ({type: CLEAR_HISTORY_STATE});

export const GET_HISTORY_REQUEST = 'GET_HISTORY_REQUEST';
export const GET_HISTORY_SUCCESS = 'GET_HISTORY_SUCCESS';
export const GET_HISTORY_FAILURE = 'GET_HISTORY_FAILURE';

const getHistoryRequest = () => ({type: GET_HISTORY_REQUEST});
const getHistorySuccess = history => ({type: GET_HISTORY_SUCCESS, history});
const getHistoryFailure = error => ({type: GET_HISTORY_FAILURE, error});

export const getHistory = () => {
    return async (dispatch, getState) => {
        try {
            const headers = useHeadersAuth(getState());

            dispatch(getHistoryRequest());
            const {data} = await axiosApi.get('/track_history', {headers});

            if (data) {
                dispatch(getHistorySuccess(data));
            }
        } catch (e) {
            if (e.response) {
                useToastError(e.response.data.error);

                if (e.response.status === 401) {
                    useToastWarn('You need to login!');
                }

                dispatch(getHistoryFailure(e.response.data));
            } else {
                dispatch(getHistoryFailure({global: 'No internet'}));
            }
        }
    };
};

export const CREATE_HISTORY_REQUEST = 'CREATE_HISTORY_REQUEST'
export const CREATE_HISTORY_SUCCESS = 'CREATE_HISTORY_SUCCESS'
export const CREATE_HISTORY_FAILURE = 'CREATE_HISTORY_FAILURE'

const createHistoryRequest = () => ({type: CREATE_HISTORY_REQUEST});
const createHistorySuccess= () => ({type: CREATE_HISTORY_SUCCESS});
const createHistoryFailure = error => ({type: CREATE_HISTORY_FAILURE, error});

export const createHistory = (trackId, trackTitle) => {
    return async (dispatch, getState) => {
        try {
            const headers = useHeadersAuth(getState());

            dispatch(createHistoryRequest());

            const response = await axiosApi.post('/track_history', trackId, {headers});

            if (response.data) {
                dispatch(createHistorySuccess());
            }

            if (response.status === 200) {
                useToastInfo(`Track ${trackTitle} added to track history!`)
            }
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createHistoryFailure(e.response.data));
            } else {
                dispatch(createHistoryFailure({global: 'No internet'}));
            }
        }
    };
};