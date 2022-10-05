import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import TrackForm from "../../components/Forms/TrackForm/TrackForm";
import {clearAlbumsReducer, getAlbumsByArtist} from "../../store/actions/albumsActions";
import {getArtists} from "../../store/actions/artistsActions";
import {createTrack} from "../../store/actions/tracksActions";

const NewArtist = () => {
    const dispatch = useDispatch();

    const artists = useSelector(state => state.artists.artists);
    const albums = useSelector(state => state.albums.albums);
    const error = useSelector(state => state.tracks.tracksError);

    useEffect(() => {
        dispatch(getArtists());
        dispatch(clearAlbumsReducer());
    },[dispatch]);

    const onTrackFormSubmit = trackData => {
        dispatch(createTrack(trackData));
    };

    const getArtistsHandler = async artistId => {
        await dispatch(getAlbumsByArtist(artistId));
    };

    return (
        <>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                New Track
            </Typography>
            <TrackForm
                error={error}
                artists={artists}
                albums={albums}
                onSubmit={onTrackFormSubmit}
                artistHandler={getArtistsHandler}
            />
        </>
    );
};

export default NewArtist;