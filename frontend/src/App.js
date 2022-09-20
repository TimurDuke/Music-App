import React from 'react';
import Layout from "./components/UI/Layout/Layout";
import {Route, Switch} from "react-router-dom";
import Artists from "./containers/Artists/Artists";
import Artist from "./containers/Artist/Artist";

const App = () => {
  return (
      <Layout>
        <Switch>
          <Route path='/' exact component={Artists}/>
          <Route path='/artist/:id' component={Artist}/>
        </Switch>
      </Layout>
  );
};

export default App;
