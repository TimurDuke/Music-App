import {
    CLEAR_HISTORY_STATE,
    CREATE_HISTORY_FAILURE,
    CREATE_HISTORY_REQUEST,
    CREATE_HISTORY_SUCCESS,
    GET_HISTORY_FAILURE,
    GET_HISTORY_REQUEST,
    GET_HISTORY_SUCCESS
} from "../actions/tracksHistoryActions";

const initialState = {
    history: [],
    historyLoading: false,
    historyError: null
};

const tracksHistoryReducer = (state = initialState, actions) => {
    switch (actions.type) {
        case CLEAR_HISTORY_STATE:
            return initialState;

        case GET_HISTORY_REQUEST:
            return {...state, historyLoading: true, historyError: null};
        case GET_HISTORY_SUCCESS:
            return {...state, historyLoading: false, historyError: null, history: actions.history};
        case GET_HISTORY_FAILURE:
            return {...state, historyLoading: false, historyError: actions.error};

        case CREATE_HISTORY_REQUEST:
            return {...state, historyLoading: true, historyError: null};
        case CREATE_HISTORY_SUCCESS:
            return {...state, historyLoading: false, historyError: null};
        case CREATE_HISTORY_FAILURE:
            return {...state, historyLoading: false, historyError: actions.error};

        default:
            return state;
    }
};

export default tracksHistoryReducer;