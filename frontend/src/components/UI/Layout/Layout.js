import React from 'react';
import {AppBar, Container, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Layout = ({children}) => {
    return (
        <>
            <AppBar sx={{padding: '10px 15px'}}>
                <Typography
                    component={Link}
                    to='/'
                    sx={{textDecoration: 'none', color: '#fff'}}
                    variant='h4'
                >
                    Music Application
                </Typography>
            </AppBar>
            <Toolbar sx={{marginBottom: '20px'}}/>
            <Container maxWidth="xl">
                {children}
            </Container>
        </>
    );
};

export default Layout;