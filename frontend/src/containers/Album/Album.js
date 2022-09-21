import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTracks} from "../../store/actions/artistsActions";
import TrackItem from "../../components/TrackItem/TrackItem";
import {Box, Typography} from "@mui/material";

const Album = ({match}) => {
    const dispatch = useDispatch();

    const tracks = useSelector(state => state.artists.tracks);
    const artistName = useSelector(state => state.artists.artistName);
    const albumTitle = useSelector(state => state.artists.albumTitle);

    useEffect(() => {
        dispatch(getTracks(match.params.id));
    }, [dispatch, match.params.id]);

    return (
        <>
            <Typography variant='h4' sx={{textAlign: 'center'}} gutterBottom>
                <span style={{opacity: 0.5, fontSize: '22px'}}>
                    Performer:
                </span> {artistName}
            </Typography>
            <Typography variant='h5' sx={{textAlign: 'center'}} gutterBottom>
                <span style={{opacity: 0.5, fontSize: '22px'}}>
                    Album:
                </span> {albumTitle}
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
                    />
                )) :  <h2 style={{textAlign: 'center'}}>This album has no tracks.</h2>}
            </Box>
        </>
    );
};

export default Album;