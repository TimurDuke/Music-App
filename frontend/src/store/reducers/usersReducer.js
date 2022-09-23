import {
    CLEAR_LOGIN_ERRORS,
    CLEAR_REGISTER_ERRORS, LOGIN_USER_FAILURE, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "../actions/usersActions";

const initialState = {
    user: null,
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    loginError: null,
};

const userReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case CLEAR_REGISTER_ERRORS:
            return {...state, registerError: null};
        case CLEAR_LOGIN_ERRORS:
            return {...state, loginError: null};

        case REGISTER_USER_REQUEST:
            return {...state, registerError: null, registerLoading: true};
        case REGISTER_USER_SUCCESS:
            return {...state, registerError: null, registerLoading: false};
        case REGISTER_USER_FAILURE:
            return {...state, registerError: actions.error, registerLoading: false};

        case LOGIN_USER_REQUEST:
            return {...state, loginError: null, loginLoading: true};
        case LOGIN_USER_SUCCESS:
            return {...state, loginError: null, loginLoading: false, user: actions.userData};
        case LOGIN_USER_FAILURE:
            return {...state, loginError: actions.error, loginLoading: false};
        case LOGOUT_USER:
            return {...state, user: null};

        default:
            return state;
    }
};

export default userReducer;