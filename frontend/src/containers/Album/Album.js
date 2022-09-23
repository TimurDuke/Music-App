import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Typography} from "@mui/material";

import {clearState, createHistory, getTracks} from "../../store/actions/musicActions";
import TrackItem from "../../components/TrackItem/TrackItem";
import Preloader from "../../components/UI/Preloader/Preloader";
import {Redirect} from "react-router-dom";

const Album = ({match}) => {
    const dispatch = useDispatch();

    const tracks = useSelector(state => state.music.tracks);
    const user = useSelector(state => state.users.user);

    const artistName = useSelector(state => state.music.artistName);
    const albumTitle = useSelector(state => state.music.albumTitle);
    const loading = useSelector(state => state.music.tracksLoading);
    const createHistoryLoading = useSelector(state => state.music.tracksHistoryLoading);

    useEffect(() => {
        dispatch(getTracks(match.params.id));

        return () => {
            dispatch(clearState());
        };
    }, [dispatch, match.params.id]);

    if (!user) {
        return <Redirect to='/login'/>
    }

    const playMusicHandler = id => {
        const data = {
          track: id
        };

        dispatch(createHistory(data));
    };

    return (
        <>
            <Preloader
                showPreloader={loading}
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
                        playHandler={() => playMusicHandler(track['_id'])}
                        isDisabled={createHistoryLoading}
                    />
                )) : <h2 style={{textAlign: 'center'}}>This album has no tracks.</h2>}
            </Box>
        </>
    );
};

export default Album;