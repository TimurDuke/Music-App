import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@mui/material";
import {deleteArtist, getUnpublishArtists, makeArtistPublic} from "../../store/actions/artistsActions";
import {deleteAlbum, getUnpublishAlbums, makeAlbumPublic} from "../../store/actions/albumsActions";
import {deleteTrack, getUnpublishTracks, makeTrackPublic} from "../../store/actions/tracksActions";
import ArtistEntityItem from "../../components/EntitiesItems/ArtistEntityItem/ArtistEntityItem";
import AlbumEntityItem from "../../components/EntitiesItems/AlbumEntityItem/AlbumEntityItem";
import TrackEntityItem from "../../components/EntitiesItems/TrackEntityItem/TrackEntityItem";
import Preloader from "../../components/UI/Preloader/Preloader";

const UnpublishedEntities = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user);

    const artists = useSelector(state => state.artists.artists);
    const artistsLoading = useSelector(state => state.artists.artistsLoading);
    const albums = useSelector(state => state.albums.albums);
    const albumsLoading = useSelector(state => state.albums.albumsLoading);
    const tracks = useSelector(state => state.tracks.tracks);
    const tracksLoading = useSelector(state => state.tracks.tracksLoading);

    useEffect(() => {
        dispatch(getUnpublishArtists());
        dispatch(getUnpublishAlbums());
        dispatch(getUnpublishTracks());
    }, [dispatch]);

    const deleteArtistHandler = artistId => {
        dispatch(deleteArtist(artistId));
    };

    const deleteAlbumHandler = albumId => {
        dispatch(deleteAlbum(albumId));
    };

    const deleteTrackHandler = trackId => {
        dispatch(deleteTrack(trackId));
    };

    const makeArtistPublicHandler = artistId => {
        dispatch(makeArtistPublic(artistId));
    };

    const makeAlbumPublicHandler = albumId => {
        dispatch(makeAlbumPublic(albumId));
    };

    const makeTrackPublicHandler = trackId => {
        dispatch(makeTrackPublic(trackId));
    };

    return (
        <>
            <Preloader
                showPreloader={artistsLoading || albumsLoading || tracksLoading}
            />
            <Grid container spacing={2} justifyContent='center'>

                <Grid item xs={12} lg={8}>
                    <Typography variant='h4'>
                        Artists
                    </Typography>
                    {!!artists.length ?
                        artists.map(artist => (
                            <ArtistEntityItem
                                key={artist._id}
                                name={artist.name}
                                isPublished={artist.published}
                                image={artist.image}
                                user={user}
                                deleteHandler={() => deleteArtistHandler(artist._id)}
                                publishHandler={() => makeArtistPublicHandler(artist._id)}
                            />
                        )) :
                        <Typography variant='h6'>
                            There are no unpublished artists.
                        </Typography>
                    }
                </Grid>

                <Grid item xs={12} lg={8}>
                    <Typography variant='h4'>
                        Albums
                    </Typography>
                    {!!albums.length ?
                        albums.map(album => (
                            <AlbumEntityItem
                                key={album._id}
                                release={album.release}
                                isPublished={album.published}
                                title={album.title}
                                image={album.image}
                                user={user}
                                deleteHandler={() => deleteAlbumHandler(album._id)}
                                publishHandler={() => makeAlbumPublicHandler(album._id)}
                            />
                        )) :
                        <Typography variant='h6'>
                            There are no unpublished albums.
                        </Typography>
                    }
                </Grid>

                <Grid item xs={12} lg={8}>
                    <Typography variant='h4'>
                        Tracks
                    </Typography>
                    {!!tracks.length ?
                        tracks.map(track => (
                            <TrackEntityItem
                                key={track._id}
                                title={track.title}
                                duration={track.duration}
                                number={track.number}
                                isPublished={track.published}
                                user={user}
                                deleteHandler={() => deleteTrackHandler(track._id)}
                                publishHandler={() => makeTrackPublicHandler(track._id)}
                            />
                        )) : <Typography variant='h6'>
                            There are no unpublished tracks.
                        </Typography>
                    }
                </Grid>

            </Grid>
        </>
    );
};

export default UnpublishedEntities;