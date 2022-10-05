import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@mui/material";
import ArtistEntityItem from "../../components/EntitiesItems/ArtistEntityItem/ArtistEntityItem";
import AlbumEntityItem from "../../components/EntitiesItems/AlbumEntityItem/AlbumEntityItem";
import {getPersonalArtists} from "../../store/actions/artistsActions";
import {getPersonalAlbums} from "../../store/actions/albumsActions";
import {getPersonalTracks} from "../../store/actions/tracksActions";
import TrackEntityItem from "../../components/EntitiesItems/TrackEntityItem/TrackEntityItem";
import Preloader from "../../components/UI/Preloader/Preloader";

const Entities = () => {
    const dispatch = useDispatch();

    const artists = useSelector(state => state.artists.artists);
    const albums = useSelector(state => state.albums.albums);
    const tracks = useSelector(state => state.tracks.tracks);

    const artistsLoading = useSelector(state => state.artists.artistsLoading);
    const albumsLoading = useSelector(state => state.albums.albumsLoading);
    const tracksLoading = useSelector(state => state.tracks.tracksLoading);

    useEffect(() => {
        dispatch(getPersonalArtists());
        dispatch(getPersonalAlbums());
        dispatch(getPersonalTracks());
    }, [dispatch]);

    return (
        <>
            <Preloader
                showPreloader={artistsLoading || albumsLoading || tracksLoading}
            />
            <Grid container spacing={2} justifyContent='center'>

                <Grid item xs={10} lg={4} sm={6}>
                    <Typography variant='h6'>
                        Artists
                    </Typography>
                    {!!artists.length ?
                        artists.map(artist => (
                            <ArtistEntityItem
                                key={artist._id}
                                name={artist.name}
                                isPublished={artist.published}
                                image={artist.image}
                            />
                        )) :
                        <Typography variant='h6'>
                            You have no created artists.
                        </Typography>
                    }
                </Grid>

                <Grid item xs={10} lg={4} sm={6}>
                    <Typography variant='h6'>
                        Albums
                    </Typography>
                    {!!albums.length ?
                        albums.map(album => (
                            <AlbumEntityItem
                                key={album._id}
                                release={album.release}
                                isPublished={album.published}
                                image={album.image}
                                title={album.title}
                            />
                        )) :
                        <Typography variant='h6'>
                            You have no created albums.
                        </Typography>
                    }
                </Grid>

                <Grid item xs={10} lg={4} sm={6}>
                    <Typography variant='h6'>
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
                            />
                        )) :
                        <Typography variant='h6'>
                            You have no created tracks.
                        </Typography>
                    }
                </Grid>

            </Grid>
        </>
    );
};

export default Entities;