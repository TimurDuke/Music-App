import React from 'react';
import {AppBar, Button, Container, Grid, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Layout = ({children}) => (
    <>
        <AppBar sx={{padding: '10px 15px'}}>
            <Grid container justifyContent='space-between' alignItems='center'>
                <Grid item>
                    <Typography
                        component={Link}
                        to='/'
                        sx={{textDecoration: 'none', color: '#fff'}}
                        variant='h4'
                    >
                        Music Application
                    </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Button component={Link} to="/register" color="inherit">
                        Sign Up
                    </Button>
                    <Button component={Link} to="/login" color="inherit">
                        Sign In
                    </Button>
                </Grid>
            </Grid>
        </AppBar>
        <Toolbar sx={{marginBottom: '20px'}}/>
        <Container maxWidth="xl">
            {children}
        </Container>
    </>
);

export default Layout;