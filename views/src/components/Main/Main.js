import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import axios from 'axios';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Main() {
    
    const apiUrl = `${process.env.REACT_APP_API_URL}/api`;
    const [eventsArray, setEventsArray] = useState([]);
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

                        fetchEvents();
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

    const fetchEvents = async () => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');

        try {
            const response = await axios.post(`${apiUrl}/events/list-events`, {
                token: token,
                id: id
            });

            if (response.status === 200) {
                setEventsArray(response.data.msg);
            }
            else if(response.status === 201) {
                alert(response.data.msg);
                navigate('/login');
            }
        } catch (err) {
            alert(err.response.data.msg);
            navigate('/');
        }
    };

    const deleteEvent = async (eventId, index) => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        
        try {
            const response = await axios.post(`${apiUrl}/events/delete-event`, {
                eventId: eventId,
                token: token,
                id: id
            });

            if (response.status === 200) {
                eventsArray.splice(index, 1);
                setEventsArray([...eventsArray]);
            }
            else if(response.status === 201) {
                alert(response.data.msg);
            }
        } catch (err) {
            alert(err.response.data.msg);
        }
    }

    const navigateToCreateEvent = () => {
        navigate('/create-event');
    }

    return (
        <>
        <Navbar />
        <Box
        sx={{
            width: 300,
            borderRadius: 2,
            textAlign: 'center',
            fontSize: '1.1em',
            backgroundColor: 'primary.dark',
            '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
                cursor: 'pointer',
            },
            p: 1,
            m: 2
        }}
        onClick={navigateToCreateEvent}>
            <p> Create Event + </p>
        </Box>
        {eventsArray.map((eventItem, index) =>
            <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <p style={{textDecoration: 'underline', fontSize: '1.2em'}}> Event Name: {eventItem.eventName} </p>
                </AccordionSummary>
                <AccordionDetails>
                    <p> Event Link: {eventItem.eventLink} </p>
                    <p> Event Time: {eventItem.eventTime} </p>
                    <p> Event Organizer: {eventItem.eventOrganizerName} </p>
                    <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#ff0000',
                        '&:hover': {
                            backgroundColor: '#ce0000'
                        }
                    }}
                    onClick={() => { deleteEvent(eventItem._id, index) }}>Delete Event</Button>
                </AccordionDetails>
            </Accordion>
        )}
        </>
    );
}