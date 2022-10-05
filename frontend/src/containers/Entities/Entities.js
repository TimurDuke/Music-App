import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Grid, Typography} from "@mui/material";
import {apiUrl} from "../../config";
import ArtistEntityItem from "../../components/EntitiesItems/ArtistEntityItem/ArtistEntityItem";
import AlbumEntityItem from "../../components/EntitiesItems/AlbumEntityItem/AlbumEntityItem";
import {getPersonalArtists} from "../../store/actions/artistsActions";
import {getPersonalAlbums} from "../../store/actions/albumsActions";
import {getPersonalTracks} from "../../store/actions/tracksActions";
import TrackEntityItem from "../../components/EntitiesItems/TrackEntityItem/TrackEntityItem";

const Entities = () => {
    const dispatch = useDispatch();

    const artists = useSelector(state => state.artists.artists);
    const albums = useSelector(state => state.albums.albums);
    const tracks = useSelector(state => state.tracks.tracks);

    useEffect(() => {
        dispatch(getPersonalArtists());
        dispatch(getPersonalAlbums());
        dispatch(getPersonalTracks());
    }, [dispatch]);

    return (
        <Grid container spacing={2} justifyContent='center'>
            {!!artists.length ?
                <Grid item xs={10} lg={4} sm={6}>
                    <Typography variant='h6'>
                        Artists
                    </Typography>
                    {artists.map(artist => (
                        <ArtistEntityItem
                            key={artist._id}
                            name={artist.name}
                            isPublished={artist.published}
                            image={apiUrl + artist.image}
                        />
                    ))}
                </Grid>
                : null}
            {!!albums.length ?
                <Grid item xs={10} lg={4} sm={6}>
                    <Typography variant='h6'>
                        Albums
                    </Typography>
                    {albums.map(album => (
                        <AlbumEntityItem
                            key={album._id}
                            release={album.release}
                            isPublished={album.published}
                            title={album.title}
                        />
                    ))}
                </Grid>
                : null}
            {!!tracks.length ?
                <Grid item xs={10} lg={4} sm={6}>
                    <Typography variant='h6'>
                        Tracks
                    </Typography>
                    {tracks.map(track => (
                        <TrackEntityItem
                            key={track._id}
                            title={track.title}
                            duration={track.duration}
                            number={track.number}
                            isPublished={track.published}
                        />
                    ))}
                </Grid>
                : null}
        </Grid>
    );
};

export default Entities;