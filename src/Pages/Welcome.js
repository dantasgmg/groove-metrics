import React from "react";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=79e16bbbdc614756b45bd4230d44c7e0"
  +"&response_type=code"
  +"&redirect_uri=http://localhost:3000/home"
  +"&scope=streaming%20user-read-email%20user-read-private%"
  +"20user-library-read%20user-library-modify%"
  +"20user-read-playback-state%20user-modify-playback-state"

function Welcome() {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Entre em sua conta
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                            href = {AUTH_URL}
                        >
                            Entrar
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default Welcome;