import {useState} from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link} from "react-router-dom";
import {Box} from "@mui/material";
import {useDispatch} from "react-redux";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

import {logoutUser} from "../../../../store/actions/usersActions";

const UserMenu = ({user}) => {
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Button
                    color='inherit'
                    sx={{marginRight: "20px"}}
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
                >
                    Hello, {user.username}!
                    <VerifiedUserIcon sx={{marginLeft: '5px'}}/>
                </Button>
            </Box>
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
