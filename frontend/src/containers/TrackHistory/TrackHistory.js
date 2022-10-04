import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@mui/material";
import {Redirect} from "react-router-dom";

import HistoryItem from "../../components/HistoryItem/HistoryItem";
import Preloader from "../../components/UI/Preloader/Preloader";
import {getHistory} from "../../store/actions/tracksHistoryActions";

const TrackHistory = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user);
    const tracksHistory = useSelector(state => state.tracksHistory.history);
    const loading = useSelector(state => state.tracksHistory.historyLoading);

    useEffect(() => {
        dispatch(getHistory());
    }, [dispatch]);

    if (!user) {
        return <Redirect to='login'/>
    }

    return (
        <>
            <Preloader
                showPreloader={loading}
            />
            {!!tracksHistory.length ?
                <Grid container spacing={2} alignItems='center' justifyContent='center'>
                    {tracksHistory.map(history => (
                        <HistoryItem
                            key={history['_id']}
                            artistName={history.track.album.artist.name}
                            trackName={history.track.title}
                            datetime={history.datetime}
                        />
                    ))}
                </Grid> : <h2 style={{textAlign: 'center'}}>You don't have track history yet.</h2>
            }
        </>
    );
};

export default TrackHistory;