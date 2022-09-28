import React from 'react';
import ReactDOM from 'react-dom/client';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import history from "./history";
import musicReducer from "./store/reducers/musicReducer";
import usersReducer from "./store/reducers/usersReducer";
import tracksHistoryReducer from "./store/reducers/tracksHistoryReducer";

import App from './App';
import './index.css';

const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);

        localStorage.setItem("state", serializedState);
    } catch (e) {
        console.error(e);
    }
};

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');

        if (serializedState === null) {
            return undefined;
        }

        return JSON.parse(serializedState);
    } catch (e) {
        console.error(e);

        return undefined;
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    music: musicReducer,
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
    });
});

const app = (
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
