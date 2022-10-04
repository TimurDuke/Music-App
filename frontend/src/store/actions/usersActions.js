import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {useToastSuccess} from "../../hooks";

export const CLEAR_REGISTER_ERRORS = 'CLEAR_REGISTER_ERRORS';
export const clearRegisterErrors = () => ({type: CLEAR_REGISTER_ERRORS});

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
const registerUserSuccess = userData => ({type: REGISTER_USER_SUCCESS, userData});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

export const registerUser = userData => {
    return async dispatch => {
        try {
            dispatch(registerUserRequest());

            const response = await axiosApi.post('/users', userData);

            if (response.data) {
                dispatch(registerUserSuccess(response.data));
                dispatch(historyPush('/'));
            }

            if (response.status === 200) {
                useToastSuccess('You have successfully registered!');
            }
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(registerUserFailure(e.response.data));
            } else {
                dispatch(registerUserFailure({global: 'No internet'}));
            }
        }
    };
};

export const LOGOUT_USER = 'LOGOUT_USER';

export const logoutUser = () => {
    return async dispatch => {
        try {
            await axiosApi.delete('users/sessions');

            dispatch({type: LOGOUT_USER});
            dispatch(historyPush('/'));
        } catch (e) {
            console.error(e);
        }
    };
}

export const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';
export const clearLoginErrors = () => ({type: CLEAR_LOGIN_ERRORS});

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
const loginUserSuccess = userData => ({type: LOGIN_USER_SUCCESS, userData});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

export const loginUser = userData => {
    return async dispatch => {
        try {
            dispatch(loginUserRequest());

            const response = await axiosApi.post('/users/sessions', userData);

            if (response.data) {
                dispatch(loginUserSuccess(response.data));
                dispatch(historyPush('/'));
            }

            if (response.status === 200) {
                useToastSuccess('You have successfully logged in!');
            }
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(loginUserFailure(e.response.data));
            } else {
                dispatch(loginUserFailure({global: 'No internet'}));
            }
        }
    };
};