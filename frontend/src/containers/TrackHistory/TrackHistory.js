import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getHistory} from "../../store/actions/musicActions";
import {Box, List} from "@mui/material";
import HistoryItem from "../../components/HistoryItem/HistoryItem";
import {Redirect} from "react-router-dom";
import Preloader from "../../components/UI/Preloader/Preloader";

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
            <Box>
                {!!tracksHistory.length ?
                    <List sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                        {tracksHistory.map(history => (
                            <HistoryItem
                                key={history['_id']}
                                artistName={history.track.album.artist.name}
                                trackName={history.track.title}
                                datetime={history.datetime}
                            />
                        ))}
                    </List> : <h2 style={{textAlign: 'center'}}>You don't have track history yet.</h2>
                }
            </Box>
        </>
    );
};

export default TrackHistory;