import React from 'react';
import {Grid, ListItemButton, ListItemText} from "@mui/material";

const HistoryItem = ({artistName, trackName, datetime}) => {
    const date = <span>
                    <span style={{fontSize: '14px', marginRight: '10px', color: '#ccc'}}>Datetime</span>
                    {new Date(datetime).toLocaleString()}
                </span>

    return (
       <Grid item xs={12} lg={8} md={10} sm={12} alignItems='center' justifyContent='center'>
           <ListItemButton
               sx={{
                   margin: '10px 0',
                   borderBottom: '2px solid blue',
                   borderLeft: '2px solid blue',
                   borderRight: '2px solid blue',
                   borderRadius: '5px'
               }}
           >
               <span style={{fontSize: '14px', marginRight: '10px', color: '#ccc'}}>Author</span>
               <ListItemText primary={artistName}/>
               <span style={{fontSize: '14px', margin: '0 5px', color: '#ccc'}}>Track</span>
               <ListItemText primary={trackName}/>
               <ListItemText primary={date} sx={{textAlign: 'end'}}/>
           </ListItemButton>
       </Grid>
    );
};

export default HistoryItem;