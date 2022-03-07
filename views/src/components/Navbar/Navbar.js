import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function BasicMenu() {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const apiUrl = `${process.env.REACT_APP_API_URL}/api`;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }

    const signout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        navigate('/');
    };

    const deleteUser = async () => {
        
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');

        if (id && token) {
            try {
                const response = await axios.get(`${apiUrl}/delete-user?token=${token}&id=${id}`);

                alert(response.data.msg);
                signout();
            } catch (err) {
                alert(err.response.data.msg);
            }
        }
        else {
            alert("Please login first:)");
        }
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
                <MenuItem onClick={signout}>
                    <span>Signout</span>
                </MenuItem>
                <MenuItem onClick={deleteUser}>
                    <span>Delete My Account</span>
                </MenuItem>
            </Menu>
        </div>
    )
}