import axiosApi from "../../axiosApi";

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