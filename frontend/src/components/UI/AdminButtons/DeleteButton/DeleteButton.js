import React from 'react';
import {Button} from "@mui/material";
import PropTypes from "prop-types";

const DeleteButton = ({deleteHandler, height}) => (
    <Button
        sx={{marginRight: '20px', height: height}}
        size='small'
        variant='outlined'
        color='error'
        onClick={deleteHandler}
    >
        Delete
    </Button>
);

DeleteButton.propTypes = {
    deleteHandler: PropTypes.func.isRequired,
    height: PropTypes.string,
};

export default DeleteButton;