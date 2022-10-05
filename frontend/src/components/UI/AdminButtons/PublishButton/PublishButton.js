import React from 'react';
import {Button} from "@mui/material";
import PropTypes from "prop-types";

const PublishButton = ({publishHandler}) => (
    <Button
        sx={{marginRight: '20px', height: '20%'}}
        size='small'
        variant='outlined'
        onClick={publishHandler}
    >
        Publish
    </Button>
);

PublishButton.propTypes = {
    publishHandler: PropTypes.func.isRequired,
};

export default PublishButton;