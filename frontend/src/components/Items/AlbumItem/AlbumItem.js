import React from 'react';
import {Link} from "react-router-dom";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import PropTypes from "prop-types";

const AlbumItem = ({image, title, release, tracksCount, artistName, id, user, deleteHandler}) => (
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
                {user?.role === 'admin' ? <Button
                    sx={{marginRight: '20px'}}
                    size='small'
                    variant='outlined'
                    color='error'
                    onClick={deleteHandler}
                >
                    Delete
                </Button> : null}
                <Button
                    variant='outlined'
                    component={Link}
                    to={`/album/${artistName}/${title}/${id}`}
                    size='small'
                >
                    Tracks
                </Button>
            </CardActions>
        </Card>
    </Grid>
);

AlbumItem.propTypes = {
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    artistName: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    tracksCount: PropTypes.number,
    image: PropTypes.string,
    user: PropTypes.object,
    deleteHandler: PropTypes.func,
};

export default AlbumItem;