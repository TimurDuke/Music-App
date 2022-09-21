import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TrackItem = ({number, title, duration}) => {
    return (
        <>
            <Accordion sx={{width: '60%'}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>№{number} <strong>{title}</strong></Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Track duration: <strong>{duration}</strong>
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default TrackItem;