import React from 'react';
import {ListItemButton, ListItemText} from "@mui/material";

const HistoryItem = ({artistName, trackName, datetime}) => {
    return (
        <ListItemButton
            sx={{
                width: '60%',
                margin: '10px 0',
                borderBottom: '2px solid blue',
                background: '#C2EBFF'
            }}
        >
            <ListItemText primary={artistName}/>
            <ListItemText primary={trackName}/>
            <ListItemText primary={datetime} sx={{textAlign: 'end'}}/>
        </ListItemButton>
    );
};

export default HistoryItem;