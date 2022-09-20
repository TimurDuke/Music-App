import React, {useEffect} from 'react';
import {Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

const Artists = () => {
    const dispatch = useDispatch();
    const artists = useSelector(state => state.artists.artists);

    useEffect(() => {
        // dispatch()
    }, []);

    return (
        <div>
            <Grid item container spacing={3}>

            </Grid>
        </div>
    );
};

export default Artists;