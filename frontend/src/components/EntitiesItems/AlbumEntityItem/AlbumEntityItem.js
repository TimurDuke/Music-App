import React from 'react';
import {Box, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import PropTypes from "prop-types";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

const AlbumEntityItem = ({image, title, release, isPublished}) => (
    <Grid item xs>
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: '1',
                marginBottom: '20px'
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
            </CardContent>
            {!isPublished ? <CardActions
                sx={{
                    flexGrow: '1',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end'
                }}
            >
                <Typography
                    variant='h6'
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#f84343'
                    }}
                >
                    <HourglassTopIcon/>
                    Not published
                </Typography>
            </CardActions> : null}
        </Card>
    </Grid>
);

AlbumEntityItem.propTypes = {
    title: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    isPublished: PropTypes.bool.isRequired,
    image: PropTypes.string,
};

export default AlbumEntityItem;