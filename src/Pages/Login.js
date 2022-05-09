import React from "react";

import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from "@mui/material/Divider";
import { Spotify } from "mdi-material-ui";
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo4.png";

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

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={false}
                md={false}
                lg={8}
            >
                <Box sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <img src={logo} alt="Groove Metrics"></img>
                    <Typography component="h3" variant="h2" mt={3} sx={{ fontWeight: "bold" }}>
                        GROOVE METRICS
                    </Typography>
                    <Typography component="h5" variant="h3">
                        Conheça seu Som
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={4} component={Paper}>
                <Box
                    sx={{
                        height: "100%",
                        display: 'flex',
                        justifyContent: "center",
                        alignItems: 'center',
                    }}
                >
                    <Box>
                        <Typography component="h1" variant="h4">
                            Entre em sua conta
                        </Typography>
                        <Divider sx={{
                            mt: 3,
                            mb: 3
                        }} />
                        <Button
                            variant="outlined"
                            startIcon={<Spotify />}
                            onClick={handleLogin}
                            fullWidth
                        >
                            Login com o Spotify
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid >
    );
}