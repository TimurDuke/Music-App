import React from 'react';
import {AppBar, Container, Grid, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import UserMenu from "./Menu/UserMenu";
import Anonymous from "./Menu/Anonymous";

const Layout = ({children}) => {
    const user = useSelector(state => state.users.user);

    return (
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
                    <Grid item>
                        {user ? <UserMenu user={user}/> : <Anonymous/>}
                    </Grid>
                </Grid>
            </AppBar>
            <Toolbar sx={{marginBottom: '20px'}}/>
            <Container maxWidth="xl">
                {children}
            </Container>
        </>
    );
};

export default Layout;