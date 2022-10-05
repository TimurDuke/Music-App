import React from 'react';
import {Box, Card, CardActions, CardHeader, CardMedia, Grid, Typography} from "@mui/material";
import PropTypes from "prop-types";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";


const ArtistEntityItem = ({name, image, isPublished}) => (
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
            <Box sx={{display: 'flex'}}>
                {image ?
                    <CardMedia
                        title={name}
                        image={image}
                        sx={{
                            margin: '10px 0 0 10px',
                            height: 85,
                            width: 85,
                            borderRadius: '50%',
                        }}
                    />
                    : null}
                <CardHeader title={name} sx={{padding: '35px'}}/>
            </Box>
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

ArtistEntityItem.propTypes = {
    name: PropTypes.string.isRequired,
    isPublished: PropTypes.bool.isRequired,
    image: PropTypes.string,
};

export default ArtistEntityItem;