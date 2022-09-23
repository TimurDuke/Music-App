import {REGISTER_USER_FAILURE, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS} from "../actions/usersActions";

const initialState = {
    user: null,
    registerLoading: false,
    registerError: null,
    loginLoading: false,
    loadingError: null,
};

const userReducer = (state = initialState, actions) => {
    switch(actions.type) {
        case REGISTER_USER_REQUEST:
            return {...state, registerError: null, registerLoading: true};
        case REGISTER_USER_SUCCESS:
            return {...state, registerError: null, registerLoading: false};
        case REGISTER_USER_FAILURE:
            return {...state, registerError: actions.error, registerLoading: false};

        default:
            return state;
    }
};

export default userReducer;