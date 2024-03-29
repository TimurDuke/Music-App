import React from 'react';
import {useSelector} from "react-redux";
import {Route, Switch} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "./components/UI/Layout/Layout";
import Artists from "./containers/Artists/Artists";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import TrackHistory from "./containers/TrackHistory/TrackHistory";
import NewArtist from "./containers/NewArtist/NewArtist";
import NewAlbum from "./containers/NewAlbum/NewAlbum";
import NewTrack from "./containers/NewTrack/NewTrack";
import Entities from "./containers/Entities/Entities";
import UnpublishedEntities from "./containers/UnpublishedEntities/UnpublishedEntities";

const App = () => {
    const user = useSelector(state => state.users.user);

    return (
        <Layout>
            <Switch>
                <Route path='/' exact component={Artists}/>

                <ProtectedRoute
                    isAllowed={!user}
                    redirectTo='/'
                    path='/register'
                    component={Register}
                />

                <ProtectedRoute
                    isAllowed={!user}
                    redirectTo='/'
                    path='/login'
                    component={Login}
                />

                <ProtectedRoute
                    isAllowed={user}
                    redirectTo='/login'
                    path='/track_history'
                    component={TrackHistory}
                />

                <Route path='/artist/:artist/:id' component={Albums}/>

                <ProtectedRoute
                    isAllowed={user}
                    redirectTo='/login'
                    path='/album/:artist/:album/:id'
                    component={Tracks}
                />

                <ProtectedRoute
                    isAllowed={user}
                    redirectTo='/login'
                    path='/add/artist'
                    component={NewArtist}
                />

                <ProtectedRoute
                    isAllowed={user}
                    redirectTo='/login'
                    path='/add/album'
                    component={NewAlbum}
                />

                <ProtectedRoute
                    isAllowed={user}
                    redirectTo='/login'
                    path='/add/track'
                    component={NewTrack}
                />

                <ProtectedRoute
                    isAllowed={user}
                    redirectTo='/login'
                    path='/entities'
                    component={Entities}
                />

                <ProtectedRoute
                    isAllowed={user && user.role === 'admin'}
                    redirectTo='/'
                    path='/unpublished'
                    component={UnpublishedEntities}
                />

                <Route render={() => <h1 style={{textAlign: 'center'}}>Not found!</h1>}/>
            </Switch>
        </Layout>
    );
};

export default App;
