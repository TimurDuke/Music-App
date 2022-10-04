import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import axiosApi from "../axiosApi";
import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import usersReducer from "./reducers/usersReducer";
import tracksHistoryReducer from "./reducers/tracksHistoryReducer";
import artistsReducer from "./reducers/artistsReducer";
import albumsReducer from "./reducers/albumsReducer";
import tracksReducer from "./reducers/tracksReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    users: usersReducer,
    tracksHistory: tracksHistoryReducer,
});

const persistedState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
    saveToLocalStorage({
        users: store.getState().users,
    })
});

axiosApi.interceptors.request.use(config => {
   try {
       config.headers['Authorization'] = store.getState().users.user.token;
   } catch (e) {}

    return config;
});

export default store;