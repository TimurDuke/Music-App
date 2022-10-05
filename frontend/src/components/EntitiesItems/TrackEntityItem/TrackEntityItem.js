import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from "prop-types";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import DeleteButton from "../../UI/AdminButtons/DeleteButton/DeleteButton";
import PublishButton from "../../UI/AdminButtons/PublishButton/PublishButton";

const TrackEntityItem = ({number, title, duration, isPublished, user, deleteHandler, publishHandler}) => (
    <>
        <Accordion sx={{width: '100%', marginBottom: '20px'}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography sx={{marginRight: '10px'}}>№{number} <strong>{title}</strong></Typography>
                {user?.role === 'admin' ?
                    <DeleteButton deleteHandler={deleteHandler} height='20%'/>
                    : null}
                {user?.role === 'admin' ?
                    <PublishButton publishHandler={publishHandler}/>
                    : null}
                {!isPublished ?
                    <Typography
                        variant='body'
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            color: '#f84343',
                            marginLeft: '20px'
                        }}
                    >
                        <HourglassTopIcon size='small'/>
                        Not published
                    </Typography>
                    : null}
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    Track duration: <strong>{duration}</strong>
                </Typography>
            </AccordionDetails>
        </Accordion>
    </>
);

TrackEntityItem.propTypes = {
    title: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    isPublished: PropTypes.bool.isRequired,
    user: PropTypes.object,
    deleteHandler: PropTypes.func,
    publishHandler: PropTypes.func,
};

export default TrackEntityItem;