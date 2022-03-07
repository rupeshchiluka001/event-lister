import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';

export default function CreateEvent() {

    const apiUrl = `${process.env.REACT_APP_API_URL}/api`;
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    const oneDayMs = 1000*3600*24; // one day in milli seconds
    const navigate = useNavigate();
    const theme = createTheme();
    const [dateAndTime, setDateAndTime] = useState(new Date(Date.now() + 2*oneDayMs));
    const [eventLinkValid, setEventLinkValid] = useState(true);

    useEffect(() => {
        if (token && id) {
            axios.get(`${apiUrl}/verify-token?token=${token}&id=${id}`)
                .then( (res) => {
                    if (res.status === 200) {
                        localStorage.setItem('token', res.data.msg);
                        localStorage.setItem('id', res.data.id);
                    }
                    else if(res.status === 201) {
                        alert(res.data.msg);
                        navigate('/login');
                    }
                })
                .catch((err) => {
                    alert(err.response.data.msg);
                    navigate('/login');
                })
        }
        else {
            navigate('/login');
        }
    });

    const create = async (formData) => {
        if (!eventLinkValid) {
            return;
        }
        
        try {
            await axios.post(`${apiUrl}/events/add-event`, {
                eventname: formData.get('eventname'),
                eventlink: formData.get('eventlink'),
                eventtime: dateAndTime,
                token: token,
                id: id
            });

            alert("Event successfully added!!");

        } catch (err) {
            alert(err.response.data.msg);
        }
        
        navigate('/main');
    }

    const eventTimeHandle = (newValue) => {
        setDateAndTime(newValue);
    };

    const eventLinkHandle = (event) => {
        setEventLinkValid(event.currentTarget.value.match(/^https?:\/\/([\S]{1,}\/?)+$/i) ? true : false);
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        create(new FormData(event.currentTarget));        
    };

    return (
        <>
        <Navbar />
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
                    CREATE EVENT
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="eventname"
                                label="Event Name"
                                name="eventname"
                                autoComplete="eventname"
                                helperText={"Enter valid name"}
                                />
                            </Grid>
                            <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="eventlink"
                                label="Event Link"
                                id="eventlink"
                                helperText={"Enter valid http(s):// link"}
                                onChange={eventLinkHandle}
                                error={!eventLinkValid}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(params) => <TextField {...params} />}
                                        label="Event Link. Should be atleast 2 days ahead."
                                        value={dateAndTime}
                                        onChange={eventTimeHandle}
                                        minDate={new Date(Date.now() + 2*oneDayMs)}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            CREATE
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
        </>
    )
}