import React from "react";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from "@mui/material/Divider";
import { Login, Spotify } from "mdi-material-ui";
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const CLIENT_ID = "79e16bbbdc614756b45bd4230d44c7e0"; // insert your client id here from spotify
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/home/";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-recently-played",
  "user-top-read",
  "user-library-read",
  "playlist-read-private"
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

export default function SignInSide() {
    const handleLogin = () => {
        window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={false}
                md={false}
                lg={8}
            >
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={4} component={Paper}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Entre em sua conta
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3 }}
                            startIcon={<Login />}
                            onClick={() => { navigate("/", { replace: true }) }}
                        >
                            Login
                        </Button>
                        <Divider sx={{ mt: 3 }} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="outlined"
                            sx={{ mt: 3 }}
                            startIcon={<Spotify />}
                            onClick={handleLogin}
                        >
                            Login com o Spotify
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid >
    );
}