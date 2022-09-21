import React from 'react';
import Layout from "./components/UI/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import Artists from "./containers/Artists/Artists";
import Artist from "./containers/Artist/Artist";
import Album from "./containers/Album/Album";

const App = () => (
    <Layout>
        <Switch>
            <Route path='/' exact component={Artists}/>
            <Route path='/artist/:artist/:id' component={Artist}/>
            <Route path='/album/:artist/:album/:id' component={Album}/>
        </Switch>
    </Layout>
);

export default App;
