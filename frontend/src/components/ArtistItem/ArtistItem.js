import React from 'react';
import {Card, CardHeader, CardMedia, Grid} from "@mui/material";

const ArtistItem = ({name, image}) => {
    return (
        <Grid item xs={12} sm={6} lg={3}>
            <Card sx={{height: '100%'}}>
                <CardHeader title={name}/>
                <CardMedia
                    title={name}
                    image={image}
                    sx={{paddingTop: '56.25%', height: 0}}
                />
            </Card>
        </Grid>
    );
};

export default ArtistItem;