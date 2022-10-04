import axiosApi from "../../axiosApi";

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