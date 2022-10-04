import React from 'react';
import {Link} from "react-router-dom";
import {Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";

const AlbumItem = props => (
    <Grid item xs={12} sm={3} lg={2}>
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: '1'
            }}
        >
            {props.image ? <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CardMedia
                        title={props.title}
                        image={props.image}
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
                    <strong>{props.title}</strong>
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    {new Date(props.release).toLocaleDateString()}
                </Typography>
                <Typography variant="body">
                    Tracks count: {props.tracksCount}
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
                    to={`/album/${props.artistName}/${props.title}/${props.id}`}
                    size='small'
                >
                    Tracks
                </Button>
            </CardActions>
        </Card>
    </Grid>
);

export default AlbumItem;