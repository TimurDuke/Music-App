import React from 'react';
import {Box, Card, CardHeader, CardMedia, Grid, Typography} from "@mui/material";
import PropTypes from "prop-types";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import {apiUrl} from "../../../config";
import DeleteButton from "../../UI/AdminButtons/DeleteButton/DeleteButton";
import PublishButton from "../../UI/AdminButtons/PublishButton/PublishButton";


const ArtistEntityItem = ({name, image, isPublished, user, deleteHandler, publishHandler}) => (
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
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                {image ?
                    <CardMedia
                        title={name}
                        image={apiUrl + image}
                        sx={{
                            margin: '10px 0 0 10px',
                            height: 85,
                            width: 85,
                            borderRadius: '50%',
                        }}
                    />
                    : null}
                <CardHeader title={name} sx={{padding: '35px'}}/>
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
        </Card>
    </Grid>
);

ArtistEntityItem.propTypes = {
    name: PropTypes.string.isRequired,
    isPublished: PropTypes.bool.isRequired,
    image: PropTypes.string,
    user: PropTypes.object,
    deleteHandler: PropTypes.func,
    publishHandler: PropTypes.func,
};

export default ArtistEntityItem;