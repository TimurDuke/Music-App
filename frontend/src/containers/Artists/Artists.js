import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@mui/material";

import {apiUrl} from "../../config";
import {getArtists} from "../../store/actions/musicActions";
import ArtistItem from "../../components/ArtistItem/ArtistItem";
import Preloader from "../../components/UI/Preloader/Preloader";

const Artists = () => {
    const dispatch = useDispatch();

    const artists = useSelector(state => state.music.artists);
    const loading = useSelector(state => state.music.artistsLoading);

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    return (
        <>
            <Preloader
                showPreloader={loading}
            />
            <Grid item container spacing={3}>
                {!!artists.length ? artists.map(artist => (
                    <ArtistItem
                        key={artist['_id']}
                        id={artist['_id']}
                        name={artist.name}
                        image={artist.image ? apiUrl + '/' + artist.image : null}
                    />
                )) : null}
            </Grid>
        </>
    );
};

export default Artists;