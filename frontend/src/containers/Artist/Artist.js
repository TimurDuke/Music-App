import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@mui/material";

import {apiUrl} from "../../config";
import {clearState, getAlbums} from "../../store/actions/musicActions";
import AlbumItem from "../../components/AlbumItem/AlbumItem";
import Preloader from "../../components/UI/Preloader/Preloader";

const Artist = ({match}) => {
    const dispatch = useDispatch();

    const albums = useSelector(state => state.music.albums);
    const artistName = useSelector(state => state.music.artistName);
    const loading = useSelector(state => state.music.loading);

    useEffect(() => {
        dispatch(getAlbums(match.params.id));

        return () => {
            dispatch(clearState());
        };
    }, [dispatch, match.params.id]);

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
            {!!albums.length ? <Grid container spacing={5}>
                {albums.map(album => (
                    <AlbumItem
                        key={album['_id']}
                        id={album['_id']}
                        title={album.title}
                        release={album.release}
                        tracksCount={album.tracksCount}
                        artistName={album.artist.name}
                        image={album.image ? apiUrl + '/uploads/' + album.image : null}
                    />
                ))}
            </Grid> : <h2 style={{textAlign: 'center'}}>This artist has no albums.</h2>}
        </>
    );
};

export default Artist;