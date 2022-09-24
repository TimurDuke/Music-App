import React from 'react';
import {ListItemButton, ListItemText} from "@mui/material";

const HistoryItem = ({artistName, trackName, datetime}) => {
    const date = <span>
                    <span style={{fontSize: '14px', marginRight: '10px', color: '#ccc'}}>Datetime</span>
                    {datetime}
                </span>

    return (
        <ListItemButton
            sx={{
                width: '60%',
                margin: '10px 0',
                borderBottom: '2px solid blue',
                borderLeft: '2px solid blue',
                borderRight: '2px solid blue',
                borderRadius: '5px'
            }}
        >
            <span style={{fontSize: '14px', marginRight: '10px', color: '#ccc'}}>Author</span>
            <ListItemText primary={artistName}/>
            <span style={{fontSize: '14px', marginRight: '10px', color: '#ccc'}}>Track</span>
            <ListItemText primary={trackName}/>
            <ListItemText primary={date} sx={{textAlign: 'end'}}/>
        </ListItemButton>
    );
};

export default HistoryItem;