import axiosApi from "../../axiosApi";

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