import axiosApi from "../../axiosApi";

export const CLEAR_STATE = 'CLEAR_STATE';

export const clearState = () => ({type: CLEAR_STATE});

export const GET_ARTISTS_REQUEST = 'GET_ARTISTS_REQUEST';
export const GET_ARTISTS_SUCCESS = 'GET_ARTISTS_SUCCESS';
export const GET_ARTISTS_FAILURE = 'GET_ARTISTS_FAILURE';

const getArtistsRequest = () => ({type: GET_ARTISTS_REQUEST});
const getArtistsSuccess = artists => ({type: GET_ARTISTS_SUCCESS, artists});
const getArtistsFailure = error => ({type: GET_ARTISTS_FAILURE, error});

export const getArtists = () => {
    return async dispatch => {
        try {
            dispatch(getArtistsRequest());
            const {data} = await axiosApi.get('/artists');
            if (data) {
                dispatch(getArtistsSuccess(data));
            }
        } catch (e) {
            dispatch(getArtistsFailure(e));
        }
    };
};

export const GET_ALBUMS_REQUEST = 'GET_ALBUMS_REQUEST';
export const GET_ALBUMS_SUCCESS = 'GET_ALBUMS_SUCCESS';
export const GET_ALBUMS_FAILURE = 'GET_ALBUMS_FAILURE';

const getAlbumsRequest = () => ({type: GET_ALBUMS_REQUEST});
const getAlbumsSuccess = albums => ({type: GET_ALBUMS_SUCCESS, albums});
const getAlbumsFailure = error => ({type: GET_ALBUMS_FAILURE, error});

export const getAlbums = artistId => {
    return async dispatch => {
        try {
            dispatch(getAlbumsRequest());
            const {data} = await axiosApi.get('/albums?artist=' + artistId);

            if (data) {
                dispatch(getAlbumsSuccess(data));
            }
        } catch (e) {
            dispatch(getAlbumsFailure(e));
        }
    };
};

export const GET_TRACKS_REQUEST = 'GET_TRACKS_REQUEST';
export const GET_TRACKS_SUCCESS = 'GET_TRACKS_SUCCESS';
export const GET_TRACKS_FAILURE = 'GET_TRACKS_FAILURE';

const getTracksRequest = () => ({type: GET_TRACKS_REQUEST});
const getTracksSuccess = tracks => ({type: GET_TRACKS_SUCCESS, tracks});
const getTracksFailure = error => ({type: GET_TRACKS_FAILURE, error});

export const getTracks = albumId => {
    return async dispatch => {
        try {
            dispatch(getTracksRequest());

            const {data} = await axiosApi.get('/tracks?album=' + albumId);
            if (data) {
                dispatch(getTracksSuccess(data));
            }
        } catch (e) {
            dispatch(getTracksFailure(e));
        }
    };
};