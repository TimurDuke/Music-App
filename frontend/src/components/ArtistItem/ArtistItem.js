import React from 'react';
import {Button, Card, CardHeader, CardMedia, Grid} from "@mui/material";
import {Link} from "react-router-dom";

const ArtistItem = ({name, image, id}) => {
    return (
        <Grid item xs={12} sm={4} lg={3}>
            <Card sx={{height: '100%'}}>
                <CardHeader title={name}/>
                <CardMedia
                    title={name}
                    image={image}
                    sx={{paddingTop: '56.25%', height: 100}}
                />
                <Button
                    variant='outlined'
                    sx={{margin: '10px'}}
                    component={Link}
                    to={`/artist/${id}`}
                >
                    Подробнее
                </Button>
            </Card>
        </Grid>
    );
};

export default ArtistItem;