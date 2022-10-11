import {useState} from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {CardMedia, Grid} from "@mui/material";
import {useDispatch} from "react-redux";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import {logoutUser} from "../../../../store/actions/usersActions";
import {apiUrl} from "../../../../config";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const avatarImage = user.facebookId ? user.avatarImage : apiUrl + user.avatarImage;

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Grid container alignItems='center' justifyContent='center'
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: {xs: 'column', sm: 'row'}
            }}
            >
                <Button
                    color='inherit'
                    sx={{marginRight: "20px", marginBottom: {xs: '10px', sm: "0"}}}
                    variant='outlined'
                    size='small'
                    component={Link}
                    to='/entities'
                >
                    My entities
                </Button>
                <Button
                    color='inherit'
                    sx={{marginRight: "20px"}}
                    variant='outlined'
                    size='small'
                    component={Link}
                    to='/track_history'
                >
                    Tracks History
                </Button>
                <Button
                    id="basic-button"
                    color="inherit"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    size='large'
                    startIcon={<VerifiedUserIcon sx={{marginLeft: '5px'}}/>}
                    endIcon={
                        <CardMedia
                            component="img"
                            height="30"
                            image={avatarImage}
                            sx={{borderRadius: '50%'}}
                            alt="Avatar image"
                        />
                    }
                    sx={{textTransform: 'capitalize'}}
                >
                    Hello, {user.displayName}!
                </Button>
            </Grid>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to='/add/artist'
                >
                    Add artist
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to='/add/album'
                >
                    Add album
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to='/add/track'
                >
                    Add track
                </MenuItem>
                {user.role === 'admin' ? <MenuItem
                    onClick={handleClose}
                    component={Link}
                    to='/unpublished'
                >
                    Unpublished entities
                </MenuItem> : null}
                <MenuItem onClick={() => dispatch(logoutUser())}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;
