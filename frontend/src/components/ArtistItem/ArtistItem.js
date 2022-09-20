import React from 'react';
import {Button, Card, CardActions, CardHeader, CardMedia, Grid} from "@mui/material";
import {Link} from "react-router-dom";

const ArtistItem = ({name, image, id}) => {
    return (
        <Grid item xs={12} sm={4} lg={3}>
            <Card sx={{height: '100%'}}>
                <CardHeader title={name}/>
                {image ? <CardMedia
                    title={name}
                    image={image}
                    sx={{paddingTop: '56.25%', height: 100}}
                /> : null}
                <CardActions>
                    <Button
                        variant='outlined'
                        component={Link}
                        to={`/artist/${id}/${name}`}
                    >
                        Подробнее
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default ArtistItem;