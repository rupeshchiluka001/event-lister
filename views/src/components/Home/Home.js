import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import svgLogo from './timeline-events.svg';

export default function Home() {
    return (
        <>
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            p: 5
        }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <img src={svgLogo} alt={"An Logo"} />
                </Grid>
                <Grid item xs={12} md={6}
                    display='flex'
                    flexDirection='column'
                    justifyContent='center'
                >
                    <Stack spacing={2} direction="column">
                        <h2 style={{textDecoration: '2px solid black underline'}}> EVENT LISTER </h2>
                        <Button variant='contained' href="/login"> LOGIN </Button>
                        <Button variant='contained' href="/signup"> SIGNUP </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
        </>
    );
}