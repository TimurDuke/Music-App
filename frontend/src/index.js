import React from 'react';
import ReactDOM from 'react-dom/client';
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {Router} from "react-router-dom";

import history from "./history";
import artistsReducer from "./store/reducers/artistsReducer";
import usersReducer from "./store/reducers/usersReducer";
import App from './App';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    artists: artistsReducer,
    users: usersReducer,
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

const app = (
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);
