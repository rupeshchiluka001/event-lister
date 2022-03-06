import React, { useState, useHis } from "react";
import axios from 'axios'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";

export default function Form(props) {

    const [usernameValid, setUsernameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const [dialog, setDialog] = useState(null);
    const theme = createTheme();
    const apiUrl = `${process.env.REACT_APP_API_URL}/api`;
    const navigate = useNavigate();

    const registerUser = async (formData) => {
        if (!usernameValid || !emailValid || !passwordValid) {
            return;
        }
        try {
            const response = await axios.post(`${apiUrl}/signup`, {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password')
            });

            alert(response.data.msg);
        } catch (err) {
            alert(`Error:-\n${err}`);
        }

        navigate('/');
    }

    const usernameHandle = (event) => {
        setUsernameValid(event.currentTarget.value.match(/^[a-z0-9]+$/i) ? true : false);
    };

    const emailHandle = (event) => {
        setEmailValid(event.currentTarget.value.match(/^[a-z0-9]{2,}@[a-z0-9]{2,}\.[a-z0-9]{2,}$/i) ? true : false);
    };

    const passwordHandle = (event) => {
        setPasswordValid(event.currentTarget.value.match(/\S.+/i) ? true : false);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setDialog(null);
        registerUser(new FormData(event.currentTarget));        
    };

    return (
        <>
            {dialog}
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        User Details
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="username"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        autoFocus
                                        helperText={"only alphabets, numbers"}
                                        onChange={usernameHandle}
                                        error={!usernameValid}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    helperText={"Enter valid email address"}
                                    onChange={emailHandle}
                                    error={!emailValid}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    id="password"
                                    type="password"
                                    aria-label="empty password"
                                    helperText={"only numbers, alphabets, length>6"}
                                    onChange={passwordHandle}
                                    error={!passwordValid}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                >
                                    SIGNUP
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}