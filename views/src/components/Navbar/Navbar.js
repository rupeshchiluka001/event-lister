import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const signout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const divStyle = {
        padding: '10px',
        textAlign: 'right',
        backgroundColor: '#2D2D2D'
    }

    return (
        <div style={divStyle}>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu': undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >

            <MenuIcon style={{color: '#ffffff'}}/>

            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>
                    <span onClick={signout}>Signout</span>
                </MenuItem>
            </Menu>
        </div>
    )
}