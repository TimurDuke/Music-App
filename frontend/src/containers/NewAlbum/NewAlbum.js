import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import {getArtists} from "../../store/actions/artistsActions";
import AlbumForm from "../../components/Forms/AlbumForm/AlbumForm";
import {createAlbum} from "../../store/actions/albumsActions";

const NewArtist = () => {
    const dispatch = useDispatch();

    const artists = useSelector(state => state.artists.artists);
    const error = useSelector(state => state.albums.albumsError);

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    const onAlbumFormSubmit = async albumData => {
        await dispatch(createAlbum(albumData));
    };

    return (
        <>
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                New Album
            </Typography>
            <AlbumForm
                error={error}
                onSubmit={onAlbumFormSubmit}
                artists={artists}
            />
        </>
    );
};

export default NewArtist;