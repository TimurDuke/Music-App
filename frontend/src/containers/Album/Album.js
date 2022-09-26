import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Typography} from "@mui/material";

import {clearMusicState, getTracks} from "../../store/actions/musicActions";
import TrackItem from "../../components/TrackItem/TrackItem";
import Preloader from "../../components/UI/Preloader/Preloader";
import {Redirect} from "react-router-dom";
import {createHistory} from "../../store/actions/tracksHistoryActions";

const Album = ({match}) => {
    const dispatch = useDispatch();

    const tracks = useSelector(state => state.music.tracks);
    const user = useSelector(state => state.users.user);

    const artistName = useSelector(state => state.music.artistName);
    const albumTitle = useSelector(state => state.music.albumTitle);
    const loading = useSelector(state => state.music.tracksLoading);
    const createHistoryLoading = useSelector(state => state.tracksHistory.historyLoading);

    useEffect(() => {
        dispatch(getTracks(match.params.id));

        return () => {
            dispatch(clearMusicState());
        };
    }, [dispatch, match.params.id]);

    if (!user) {
        return <Redirect to='/login'/>
    }

    const playMusicHandler = (id, title) => {
        const trackId = {
          track: id
        };

        dispatch(createHistory(trackId, title));
    };

    return (
        <>
            <Preloader
                showPreloader={loading || createHistoryLoading}
            />
            <Typography variant='h4' sx={{textAlign: 'center'}} gutterBottom>
                <span style={{opacity: 0.5, fontSize: '22px'}}>
                    Performer:
                </span> {!!artistName ? artistName : match.params.artist}
            </Typography>
            <Typography variant='h5' sx={{textAlign: 'center'}} gutterBottom>
                <span style={{opacity: 0.5, fontSize: '22px'}}>
                    Album:
                </span> {!!albumTitle ? albumTitle : match.params.album}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {!!tracks.length ? tracks.map(track => (
                    <TrackItem
                        key={track['_id']}
                        number={track.number}
                        title={track.title}
                        duration={track.duration}
                        video={track.youtube}
                        playHandler={() => playMusicHandler(track['_id'], track.title)}
                        isDisabled={createHistoryLoading}
                    />
                )) : <h2 style={{textAlign: 'center'}}>This album has no tracks.</h2>}
            </Box>
        </>
    );
};

export default Album;