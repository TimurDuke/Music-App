import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@mui/material";

import {apiUrl} from "../../config";
import AlbumItem from "../../components/Items/AlbumItem/AlbumItem";
import Preloader from "../../components/UI/Preloader/Preloader";
import {changeArtistName, clearArtistsReducer} from "../../store/actions/artistsActions";
import {clearAlbumsReducer, deleteAlbum, getAlbums} from "../../store/actions/albumsActions";

const Albums = ({match}) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user);
    const albums = useSelector(state => state.albums.albums);
    const artistName = useSelector(state => state.artists.artistName);
    const loading = useSelector(state => state.albums.albumsLoading);

    useEffect(() => {
        dispatch(getAlbums(match.params.id));

        if (!!albums.length && albums[0].artist?.name) {
            dispatch(changeArtistName(albums[0].artist.name));
        }

        return () => {
            dispatch(clearAlbumsReducer());
            dispatch(clearArtistsReducer());
        };
        // eslint-disable-next-line
    }, [dispatch, match.params.id]);

    const deleteAlbumHandler = albumId => {
        dispatch(deleteAlbum(albumId));
    };

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
                    album.published ?<AlbumItem
                        key={album['_id']}
                        id={album['_id']}
                        title={album.title}
                        release={album.release}
                        tracksCount={album.tracksCount}
                        artistName={album.artist.name}
                        image={album.image ? apiUrl + '/' + album.image : null}
                        user={user}
                        deleteHandler={() => deleteAlbumHandler(album._id)}
                    /> : null
                ))}
            </Grid> : <h2 style={{textAlign: 'center'}}>This artist has no albums.</h2>}
        </>
    );
};

export default Albums;