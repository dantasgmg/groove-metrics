import * as React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Avatar from "@mui/material/Avatar";
import { HomeVariant, ChartBar, PlaylistMusic, AccountGroup, Cog, AccountCircle } from "mdi-material-ui"
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const drawerWidth = 260;
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
var randvalue = Math.floor((Math.random() * 100) + 1);
export default function MatchPlaylists() {

    const [data, setData] = useState({});
    useEffect(() => {
        if(localStorage.getItem("accessToken")){
            axios.get(PLAYLISTS_ENDPOINT, {
                headers:{ 
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, []);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [imageurl, setImageurl] = React.useState('');
    console.log(imageurl);
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Match Playlists
                    </Typography>

                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                        edge="end"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => { navigate("/", { replace: true }) }}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <Box sx={{
                    mt: 3,
                    mb: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Avatar sx={{ width: 160, height: 160 }} src={localStorage.getItem("profileImage")}>  </Avatar>
                </Box>
                <Typography variant="h5" align="center"> {localStorage.getItem("profileName")} </Typography>
                <List>
                    <ListItem button onClick={() => { navigate("/home", { replace: true }) }}>
                        <ListItemIcon>
                            <HomeVariant />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>

                    <ListItem button onClick={() => { navigate("/insights", { replace: true }) }}>
                        <ListItemIcon>
                            <ChartBar />
                        </ListItemIcon>
                        <ListItemText primary={"Insights"} />
                    </ListItem>

                    <ListItem button selected onClick={() => { navigate("/match_playlists", { replace: true }) }}>
                        <ListItemIcon>
                            <PlaylistMusic />
                        </ListItemIcon>
                        <ListItemText primary={"Match Playlists"} />
                    </ListItem>
                    <ListItem button onClick={() => { navigate("/match_listeners", { replace: true }) }}>
                        <ListItemIcon>
                            <AccountGroup />
                        </ListItemIcon>
                        <ListItemText primary={"Match Listeners"} />
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    height: '100vh',
                    flexGrow: 1,
                    background: "linear-gradient(180deg, rgba(255,0,0,1) 0%, rgba(255,0,0,0.75) 25%, rgba(255,0,0,0.5) 50%, rgba(255,0,0,0.25) 75%, rgba(255,0,0,0) 100%)",
                    p: 3
                }}
            >
                <Toolbar />
                <Typography variant="h3">Playlist Matching</Typography>
                <Box mt={3}>
                    <Box >
                        <Typography>Escolha sua playlist:</Typography>
                        <Stack mt={1} direction="row" spacing={1} sx={{width: 1190, overflow: "auto"}} >
                        {data?.items ? data.items.map((item) =>  
                                    (
                                    <Chip
                                        avatar={<Avatar alt="Natacha" src={item.images.length >= 1 ? `${item.images[0].url}` : null} />}
                                        label={item? item.name : null}
                                        color="primary"
                                        onClick={() => {setImageurl(item)}}
                                    />
                                ))
                                : null}             
                        </Stack>
                    </Box>
                    <Box mt={3}>
                        <Typography>Escolha a playlist pública:</Typography>
                        <Box mt={1} component="form">
                            <TextField id="link" label="Link" variant="outlined" defaultValue={"https://open.spotify.com/playlist/37i9dQZF1DX11ghcIxjcjE"} fullWidth disabled />
                        </Box>
                    </Box>
                </Box>
                <Grid container mt={3}>
                    <Grid item xs={6}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column"
                        }}>
                            <Typography variant="h5" mb={1}>Grunge Forever</Typography>
                            <Avatar sx={{ width: 200, height: 200 }} src="https://i.scdn.co/image/ab67706f00000003aad44a9aec7fe4798178994f">  </Avatar>
                            <Typography mt={1}>By Spotify</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column"
                        }}>
                            <>{data?.items ? <Typography variant="h5" mb={1}>{imageurl? imageurl.name : null}</Typography> : null}
            
                            </>
            
                            <Avatar sx={{ width: 200, height: 200 }} src={imageurl ? imageurl.images.length >= 1 ? `${imageurl.images[0].url}` :null :null} onChange = {randvalue = Math.floor((Math.random() * 100) + 1) }>  </Avatar>
                            <Typography mt={1}>By {localStorage.getItem("profileName")}</Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box p={3}>
                            <Typography variant="h4">
                                Resultados
                            </Typography>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                    <CircularProgress variant="determinate" size={300} value={randvalue} />
                                    <Box
                                        sx={{
                                            top: 0,
                                            left: 0,
                                            bottom: 0,
                                            right: 0,
                                            position: 'absolute',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Typography variant="h4" component="div" color="text.secondary">
                                            {randvalue}% Match
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}
