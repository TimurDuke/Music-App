import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {useToastInfo, useToastSuccess} from "../../hooks";

export const CHANGE_ALBUM_TITLE = 'CHANGE_ALBUM_TITLE';
export const changeAlbumTitle = title => ({type: CHANGE_ALBUM_TITLE, title});

export const CLEAR_ALBUMS_REDUCER = 'CLEAR_ALBUMS_REDUCER';
export const clearAlbumsReducer = () => ({type: CLEAR_ALBUMS_REDUCER});

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

export const CREATE_ALBUM_REQUEST = 'CREATE_ALBUM_REQUEST';
export const CREATE_ALBUM_SUCCESS = 'CREATE_ALBUM_SUCCESS';
export const CREATE_ALBUM_FAILURE = 'CREATE_ALBUM_FAILURE';

const createAlbumRequest = () => ({type: CREATE_ALBUM_REQUEST});
const createAlbumSuccess = () => ({type: CREATE_ALBUM_SUCCESS});
const createAlbumFailure = error => ({type: CREATE_ALBUM_FAILURE, error});

export const createAlbum = albumData => {
    return async dispatch => {
        try {
            dispatch(createAlbumRequest());

            await axiosApi.post('/albums', albumData);
            await dispatch(createAlbumSuccess());
            await dispatch(historyPush('/'));

            useToastInfo('The album has been created, wait for the administration to check.');
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createAlbumFailure(e.response.data));
            } else {
                dispatch(createAlbumFailure({global: 'No internet'}));
            }
        }
    };
};

export const GET_ALBUMS_BY_ARTIST_REQUEST = 'GET_ALBUMS_BY_ARTIST_REQUEST';
export const GET_ALBUMS_BY_ARTIST_SUCCESS = 'GET_ALBUMS_BY_ARTIST_SUCCESS';
export const GET_ALBUMS_BY_ARTIST_FAILURE = 'GET_ALBUMS_BY_ARTIST_FAILURE';

const getAlbumsByArtistRequest = () => ({type: GET_ALBUMS_BY_ARTIST_REQUEST});
const getAlbumsByArtistSuccess = albums => ({type: GET_ALBUMS_BY_ARTIST_SUCCESS, albums});
const getAlbumsByArtistFailure = error => ({type: GET_ALBUMS_BY_ARTIST_FAILURE, error});

export const getAlbumsByArtist = artistId => {
    return async dispatch => {
        try {
            dispatch(getAlbumsByArtistRequest());

            const {data} = await axiosApi.get('/albums?artist=' + artistId);

            if (data) {
                dispatch(getAlbumsByArtistSuccess(data));
            }
        } catch (e) {
            dispatch(getAlbumsByArtistFailure(e));
        }
    };
};

export const GET_PERSONAL_ALBUMS_REQUEST = 'GET_PERSONAL_ALBUMS_REQUEST';
export const GET_PERSONAL_ALBUMS_SUCCESS = 'GET_PERSONAL_ALBUMS_SUCCESS';
export const GET_PERSONAL_ALBUMS_FAILURE = 'GET_PERSONAL_ALBUMS_FAILURE';

const getPersonalAlbumsRequest = () => ({type: GET_PERSONAL_ALBUMS_REQUEST});
const getPersonalAlbumsSuccess = albums => ({type: GET_PERSONAL_ALBUMS_SUCCESS, albums});
const getPersonalAlbumsFailure = error => ({type: GET_PERSONAL_ALBUMS_FAILURE, error});

export const getPersonalAlbums = () => {
    return async dispatch => {
        try {
            dispatch(getPersonalAlbumsRequest());

            const {data} = await axiosApi.get('/albums/personal');

            if (data) {
                dispatch(getPersonalAlbumsSuccess(data));
            }
        } catch (e) {
            dispatch(getPersonalAlbumsFailure(e));
        }
    };
};

export const GET_UNPUBLISH_ALBUMS_REQUEST = 'GET_UNPUBLISH_ALBUMS_REQUEST';
export const GET_UNPUBLISH_ALBUMS_SUCCESS = 'GET_UNPUBLISH_ALBUMS_SUCCESS';
export const GET_UNPUBLISH_ALBUMS_FAILURE = 'GET_UNPUBLISH_ALBUMS_FAILURE';

const getUnpublishAlbumsRequest = () => ({type: GET_UNPUBLISH_ALBUMS_REQUEST});
const getUnpublishAlbumsSuccess = albums => ({type: GET_UNPUBLISH_ALBUMS_SUCCESS, albums});
const getUnpublishAlbumsFailure = error => ({type: GET_UNPUBLISH_ALBUMS_FAILURE, error});

export const getUnpublishAlbums = () => {
    return async dispatch => {
        try {
            dispatch(getUnpublishAlbumsRequest());

            const {data} = await axiosApi.get('/albums/not_publish');

            if (data) {
                dispatch(getUnpublishAlbumsSuccess(data));
            }
        } catch (e) {
            dispatch(getUnpublishAlbumsFailure(e));
        }
    };
};

export const DELETE_ALBUM_REQUEST = 'DELETE_ALBUM_REQUEST';
export const DELETE_ALBUM_SUCCESS = 'DELETE_ALBUM_SUCCESS';
export const DELETE_ALBUM_FAILURE = 'DELETE_ALBUM_FAILURE';

const deleteAlbumRequest = () => ({type: DELETE_ALBUM_REQUEST});
const deleteAlbumSuccess = () => ({type: DELETE_ALBUM_SUCCESS});
const deleteAlbumFailure = error => ({type: DELETE_ALBUM_FAILURE, error});

export const deleteAlbum = albumId => {
    return async dispatch => {
        try {
            dispatch(deleteAlbumRequest());

            const {data} = await axiosApi.delete('/albums/' + albumId);

            if (data) {
                dispatch(deleteAlbumSuccess());
                useToastSuccess(data.message);
                dispatch(historyPush('/'));
            }
        } catch (e) {
            dispatch(deleteAlbumFailure(e));
        }
    };
};