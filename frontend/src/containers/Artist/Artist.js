import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAlbums} from "../../store/actions/artistsActions";
import {Grid, Typography} from "@mui/material";
import AlbumItem from "../../components/AlbumItem/AlbumItem";
import {apiUrl} from "../../config";

const Artist = ({match}) => {
    const dispatch = useDispatch();

    const albums = useSelector(state => state.artists.albums);
    const artistName = useSelector(state => state.artists.artistName);

    useEffect(() => {
        dispatch(getAlbums(match.params.id));
    }, [dispatch, match.params.id]);

    return (
        <>
            <Typography variant='h4' sx={{textAlign: 'center'}} gutterBottom>
                <span style={{opacity: 0.5, fontSize: '22px'}}>
                    Performer:
                </span>
                {artistName}
            </Typography>
            {!!albums.length ? <Grid container spacing={5}>
                {albums.map(album => (
                    <AlbumItem
                        key={album['_id']}
                        id={album['_id']}
                        title={album.title}
                        release={album.release}
                        tracksCount={album.tracksCount}
                        image={album.image ? apiUrl + '/uploads/' + album.image : null}
                    />
                ))}
            </Grid> : <h2 style={{textAlign: 'center'}}>This artist has no albums.</h2>}
        </>
    );
};

export default Artist;