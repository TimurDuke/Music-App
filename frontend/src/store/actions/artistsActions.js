import axiosApi from "../../axiosApi";
import {historyPush} from "./historyActions";
import {useToastInfo} from "../../hooks";

export const CHANGE_ARTIST_NAME = 'CHANGE_ARTIST_NAME';
export const changeArtistName = name => ({type: CHANGE_ARTIST_NAME, name});

export const CLEAR_ARTISTS_REDUCER = 'CLEAR_ARTISTS_REDUCER';
export const clearArtistsReducer = () => ({type: CLEAR_ARTISTS_REDUCER});

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

export const CREATE_ARTIST_REQUEST = 'CREATE_ARTIST_REQUEST';
export const CREATE_ARTIST_SUCCESS = 'CREATE_ARTIST_SUCCESS';
export const CREATE_ARTIST_FAILURE = 'CREATE_ARTIST_FAILURE';

const createArtistRequest = () => ({type: CREATE_ARTIST_REQUEST});
const createArtistSuccess = () => ({type: CREATE_ARTIST_SUCCESS});
const createArtistFailure = error => ({type: CREATE_ARTIST_FAILURE, error});

export const createArtist = artistData => {
    return async dispatch => {
        try {
            dispatch(createArtistRequest());

            await axiosApi.post('/artists', artistData);
            await dispatch(createArtistSuccess());
            await dispatch(historyPush('/'));

            useToastInfo('The artist has been created, wait for the administration to check.');
        } catch (e) {
            if (e.response && e.response.data) {
                dispatch(createArtistFailure(e.response.data));
            } else {
                dispatch(createArtistFailure({global: 'No internet'}));
            }
        }
    };
};