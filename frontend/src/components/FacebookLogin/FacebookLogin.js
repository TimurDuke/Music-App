import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {facebookAppId} from "../../config";
import {Box, Button} from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import {facebookLogin} from "../../store/actions/usersActions";
import {useDispatch} from "react-redux";

const FacebookLogin = () => {
    const dispatch = useDispatch();

    const facebookResponse = response => {
        dispatch(facebookLogin(response));
    };

    return (
        <FacebookLoginButton
            appId={facebookAppId}
            fields="name,email,picture"
            callback={facebookResponse}
            render={props => (
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        color='primary'
                        variant='outlined'
                        startIcon={<FacebookIcon sx={{marginBottom: '4px'}}/>}
                        onClick={props.onClick}
                        sx={{width: '50%'}}
                    >
                        Facebook
                    </Button>
                </Box>
            )}
        />
    );
};

export default FacebookLogin;