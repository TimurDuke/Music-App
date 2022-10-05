import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from "prop-types";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";

const TrackEntityItem = ({number, title, duration, isPublished}) => (
    <>
        <Accordion sx={{width: '100%', marginBottom: '20px'}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>№{number} <strong>{title}</strong></Typography>
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
};

export default TrackEntityItem;