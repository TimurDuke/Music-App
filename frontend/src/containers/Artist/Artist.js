import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAlbums} from "../../store/actions/artistsActions";
import {Grid, Typography} from "@mui/material";
import AlbumItem from "../../components/AlbumItem/AlbumItem";
import {apiUrl} from "../../config";

const Artist = ({match}) => {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.artists.albums);

    useEffect(() => {
        dispatch(getAlbums(match.params.id));
    }, [dispatch]);

    return (
        <>
            <Typography variant='h4' sx={{textAlign: 'center'}} gutterBottom>
                <span style={{opacity: 0.5, fontSize: '22px'}}>Performer: </span> {match.params.artist}
            </Typography>
            <Grid item container spacing={3} justifyContent='center'>
                {!!albums.length ? albums.map(album => (
                    <AlbumItem
                        key={album['_id']}
                        id={album['_id']}
                        title={album.title}
                        release={album.release}
                        tracksCount={album.tracksCount}
                        image={album.image ? apiUrl + '/uploads/' + album.image : null}
                    />
                )): <h2>This artist has no albums.</h2>}
            </Grid>
        </>
    );
};

export default Artist;