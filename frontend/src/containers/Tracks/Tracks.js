import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Box, Typography} from "@mui/material";

import TrackItem from "../../components/Items/TrackItem/TrackItem";
import Preloader from "../../components/UI/Preloader/Preloader";
import {Redirect} from "react-router-dom";
import {createHistory} from "../../store/actions/tracksHistoryActions";
import {changeAlbumTitle, clearAlbumsReducer} from "../../store/actions/albumsActions";
import {changeArtistName, clearArtistsReducer} from "../../store/actions/artistsActions";
import {clearTracksReducer, deleteTrack, getTracks} from "../../store/actions/tracksActions";

const Tracks = ({match}) => {
    const dispatch = useDispatch();

    const tracks = useSelector(state => state.tracks.tracks);
    const user = useSelector(state => state.users.user);

    const artistName = useSelector(state => state.artists.artistName);
    const albumTitle = useSelector(state => state.albums.albumTitle);
    const loading = useSelector(state => state.tracks.tracksLoading);
    const createHistoryLoading = useSelector(state => state.tracksHistory.historyLoading);

    useEffect(() => {
        dispatch(getTracks(match.params.id));

        if (!!tracks.length && tracks[0].album?.title && tracks[0].album?.artist?.name) {
            dispatch(changeAlbumTitle(tracks[0].album.title));
            dispatch(changeArtistName(tracks[0].album?.artist?.name));
        }

        return () => {
            dispatch(clearAlbumsReducer());
            dispatch(clearArtistsReducer());
            dispatch(clearTracksReducer());
        };
        // eslint-disable-next-line
    }, [dispatch, match.params.id, ]);

    if (!user) {
        return <Redirect to='/login'/>
    }

    const playMusicHandler = (id, title) => {
        const trackId = {
          track: id
        };

        dispatch(createHistory(trackId, title));
    };

    const deleteTrackHandler = trackId => {
        dispatch(deleteTrack(trackId));
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
                    track.published ? <TrackItem
                        key={track['_id']}
                        number={track.number}
                        title={track.title}
                        duration={track.duration}
                        video={track.youtube}
                        playHandler={() => playMusicHandler(track['_id'], track.title)}
                        isDisabled={createHistoryLoading}
                        user={user}
                        deleteHandler={() => deleteTrackHandler(track._id)}
                    /> : null
                )) : <h2 style={{textAlign: 'center'}}>This album has no tracks.</h2>}
            </Box>
        </>
    );
};

export default Tracks;