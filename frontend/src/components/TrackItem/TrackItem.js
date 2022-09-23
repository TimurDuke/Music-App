import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";

const TrackItem = ({number, title, duration, playHandler, isDisabled}) => (
    <>
        <Accordion sx={{width: '60%'}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>№{number} <strong>{title}</strong></Typography>
            </AccordionSummary>
            <AccordionDetails
                sx={{
                    display: 'flex',
                }}
            >
                <Typography>
                    Track duration: <strong>{duration}</strong>
                </Typography>
                <Button
                    variant='outlined'
                    size='small'
                    sx={{
                        marginLeft: '30px'
                    }}
                    onClick={playHandler}
                    disabled={isDisabled}
                >
                    Click to listen
                </Button>
            </AccordionDetails>
        </Accordion>
    </>
);

export default TrackItem;