import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

export default function Login() {

    const [emailValid, setEmailValid] = useState(true);
    const [passwordValid, setPasswordValid] = useState(true);
    const theme = createTheme();
    const apiUrl = `${process.env.REACT_APP_API_URL}/api`;
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        if (token && id) {
            axios.get(`${apiUrl}/verify-token?token=${token}&id=${id}`)
                .then( (res) => {
                    if (res.status === 200) {
                        localStorage.setItem('token', res.data.msg);
                        localStorage.setItem('id', res.data.id);

                        navigate('/main');
                    }
                    else if(res.status === 201) {
                        alert(res.data.msg);
                    }
                })
        }
        else {
            navigate('/login');
        }
    }, [apiUrl, navigate]);

    const loginUser = async (formData) => {
        if (!emailValid || !passwordValid) {
            return;
        }
        
        try {
            const response = await axios.post(`${apiUrl}/login`, {
                email: formData.get('email'),
                password: formData.get('password')
            });
            
            localStorage.setItem('token', response.data.msg);
            localStorage.setItem('id', response.data.id);
            
            navigate('/main');
            
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    const emailHandle = (event) => {
      setEmailValid(event.currentTarget.value.match(/^[a-z0-9]{2,}@[a-z0-9]{2,}\.[a-z0-9]{2,}$/i) ? true : false);
    };

    const passwordHandle = (event) => {
      setPasswordValid(event.currentTarget.value.match(/\S.+/i) ? true : false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        loginUser(new FormData(event.currentTarget));        
    };

    return (
        <>
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
                    <h3> LOGIN </h3>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                helperText={"Enter valid email"}
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
                                LOGIN
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </>
    );
}