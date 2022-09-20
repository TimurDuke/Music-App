import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const AlbumItem = ({image, title, release, id, tracksCount}) => {
    return (
        <Grid item xs={12} sm={4} lg={3}>
            <Card sx={{height: '100%'}}>
                {image ? <CardMedia
                    title={title}
                    image={image}
                    sx={{paddingTop: '56.25%', height: 100}}
                /> : null}
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        {new Date(release).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body">
                        Tracks count: {tracksCount}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant='outlined' component={Link} to={'/album/' + id}>
                        Tracks
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default AlbumItem;