import React from 'react';
import {Box, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import PropTypes from "prop-types";
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import {apiUrl} from "../../../config";
import DeleteButton from "../../UI/AdminButtons/DeleteButton/DeleteButton";
import PublishButton from "../../UI/AdminButtons/PublishButton/PublishButton";

const AlbumEntityItem = ({image, title, release, isPublished, user, deleteHandler, publishHandler}) => (
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
                        image={apiUrl + image}
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
                <Box sx={{display: 'flex'}}>
                    {user?.role === 'admin' ?
                        <DeleteButton deleteHandler={deleteHandler} height='20%'/>
                        : null}
                    {user?.role === 'admin' ?
                        <PublishButton publishHandler={publishHandler}/>
                        : null}
                    {!isPublished ? <Typography
                        variant='h6'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#f84343'
                        }}
                    >
                        <HourglassTopIcon/>
                        Not published
                    </Typography> : null}
                </Box>
            </CardContent>
        </Card>
    </Grid>
);

AlbumEntityItem.propTypes = {
    title: PropTypes.string.isRequired,
    release: PropTypes.string.isRequired,
    isPublished: PropTypes.bool.isRequired,
    image: PropTypes.string,
    user: PropTypes.object,
    deleteHandler: PropTypes.func,
    publishHandler: PropTypes.func,
};

export default AlbumEntityItem;