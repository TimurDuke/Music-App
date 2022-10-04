import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography} from "@mui/material";
import ArtistForm from "../../components/Forms/ArtistForm/ArtistForm";
import {createArtist} from "../../store/actions/artistsActions";

const NewArtist = () => {
    const dispatch = useDispatch();
    const error = useSelector(state => state.artists.artistsError);

    const onArtistFormSubmit = async artistData => {
        await dispatch(createArtist(artistData));
    };

    return (
        <>
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