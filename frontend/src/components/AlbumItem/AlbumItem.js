import React from 'react';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const AlbumItem = ({image, title, release, id, tracksCount}) => {
    return (
        <Grid item xs={12} sm={3} lg={2}>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: '1'
                }}
            >
                {image ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <CardMedia
                            title={title}
                            image={image}
                            sx={{
                                height: 100,
                                width: 100,
                                borderRadius: '10px'
                            }}
                        />
                    </Box>
                    : null}
                <CardContent>
                    <Typography gutterBottom variant="h5">
                        <strong>{title}</strong>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        {new Date(release).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body">
                        Tracks count: {tracksCount}
                    </Typography>
                </CardContent>
                <CardActions
                    sx={{
                        flexGrow: '1',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end'
                    }}
                >
                    <Button
                        variant='outlined'
                        component={Link}
                        to={'/album/' + id}
                        size='small'
                    >
                        Tracks
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default AlbumItem;