import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUnpublishArtists} from "../../store/actions/artistsActions";
import {getUnpublishAlbums} from "../../store/actions/albumsActions";
import {getUnpublishTracks} from "../../store/actions/tracksActions";
import {Grid, Typography} from "@mui/material";
import ArtistEntityItem from "../../components/EntitiesItems/ArtistEntityItem/ArtistEntityItem";
import AlbumEntityItem from "../../components/EntitiesItems/AlbumEntityItem/AlbumEntityItem";
import TrackEntityItem from "../../components/EntitiesItems/TrackEntityItem/TrackEntityItem";

const UnpublishedEntities = () => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.users.user);

    const artists = useSelector(state => state.artists.artists);
    const albums = useSelector(state => state.albums.albums);
    const tracks = useSelector(state => state.tracks.tracks);

    useEffect(() => {
        dispatch(getUnpublishArtists());
        dispatch(getUnpublishAlbums());
        dispatch(getUnpublishTracks());
    }, [dispatch]);

    return (
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
                        />
                    )) :
                    <Typography variant='h6'>
                        There are no unpublished artists.
                    </Typography>
                }
            </Grid>

            <Grid item xs={12} lg={8}>
                <Typography variant='h6'>
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
                        />
                    )) :
                    <Typography variant='h6'>
                        There are no unpublished albums.
                    </Typography>
                }
            </Grid>

            <Grid item xs={12} lg={8}>
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
                            user={user}
                        />
                    )) : <Typography variant='h6'>
                        There are no unpublished tracks.
                    </Typography>
                }
            </Grid>

        </Grid>
    );
};

export default UnpublishedEntities;