import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {useToastInfo} from "../../hooks";

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
