import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import ArtistForm from "../../components/Forms/ArtistForm/ArtistForm";
import {createArtist} from "../../store/actions/artistsActions";
import Preloader from "../../components/UI/Preloader/Preloader";

const NewArtist = () => {
    const dispatch = useDispatch();

    const artistsLoading = useSelector(state => state.artists.artistsLoading);
    const error = useSelector(state => state.artists.artistsError);

    const onArtistFormSubmit = artistData => {
        dispatch(createArtist(artistData));
    };

    return (
        <>
            <Preloader
                showPreloader={artistsLoading}
            />
            <Typography
                textAlign="center"
                marginBottom="20px"
                variant="h4"
            >
                New Artist
            </Typography>
            <ArtistForm
                error={error}
                onSubmit={onArtistFormSubmit}
            />
        </>
    );
};

export default NewArtist;