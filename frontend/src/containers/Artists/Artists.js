import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid} from "@mui/material";

import {apiUrl} from "../../config";
import ArtistItem from "../../components/Items/ArtistItem/ArtistItem";
import Preloader from "../../components/UI/Preloader/Preloader";
import {deleteArtist, getArtists} from "../../store/actions/artistsActions";

const Artists = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user);
    const artists = useSelector(state => state.artists.artists);
    const loading = useSelector(state => state.artists.artistsLoading);

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    const deleteArtistHandler = async artistId => {
        await dispatch(deleteArtist(artistId));
        await dispatch(getArtists());
    };

    return (
        <>
            <Preloader
                showPreloader={loading}
            />
            <Grid item container spacing={3}>
                {!!artists.length ? artists.map(artist => (
                    artist.published ?
                        <ArtistItem
                            key={artist['_id']}
                            id={artist['_id']}
                            name={artist.name}
                            image={artist.image ? apiUrl + '/' + artist.image : null}
                            user={user}
                            deleteHandler={() => deleteArtistHandler(artist._id)}
                        /> : null
                )) : null}
            </Grid>
        </>
    );
};

export default Artists;