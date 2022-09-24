import React from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Box from "@mui/material/Box";
import YouTubeIcon from '@mui/icons-material/YouTube';
import YouTube from "react-youtube";

import ModalComponent from "../UI/Modal/Modal";

const TrackItem = ({number, title, duration, playHandler, isDisabled, video}) => (
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
                        marginLeft: '20px'
                    }}
                    onClick={playHandler}
                    disabled={isDisabled}
                >
                    <PlayArrowIcon sx={{marginRight: '5px'}}/>
                    Click to listen
                </Button>
                {video ?
                    <ModalComponent
                        openButton={
                            <span
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: "pointer",
                                    marginLeft: '15px'
                                }}
                                onClick={playHandler}
                            >
                                <YouTubeIcon
                                    color='error'
                                    fontSize='large'
                                    sx={{verticalAlign: 'top'}}
                                />
                                YouTube
                            </span>
                        }
                    >
                        <Box
                            sx={{
                                position: 'absolute',
                                top: `50%`,
                                left: `50%`,
                                transform: `translate(-50%, -50%)`,
                            }}
                        >
                            <YouTube
                                videoId={video}
                                opts={{
                                    height: '449',
                                    width: '800',
                                    playerVars: {
                                        autoplay: 1,
                                    },
                                }}
                            />
                        </Box>
                    </ModalComponent> : null}
            </AccordionDetails>
        </Accordion>
    </>
);

export default TrackItem;