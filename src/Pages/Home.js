import * as React from 'react';
import axios from 'axios';
import { useEffect, useState } from "react";
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
import ImageListItem  from "@mui/material/ImageListItem"
import ImageList  from "@mui/material/ImageList"
import ImageListItemBar  from "@mui/material/ImageListItemBar"

import { HomeVariant, ChartBar, PlaylistMusic, AccountGroup, Cog, AccountCircle } from "mdi-material-ui"
import { useNavigate } from "react-router-dom";

const drawerWidth = 260;

const PROFILE_ENDPOINT = "https://api.spotify.com/v1/me";
const TOP_TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10&offset=0"
const TOP_TRACKS_ENDPOINT_MONTH = "https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10&offset=0"

const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};

export default function Home() {

    useEffect(() => {
        if (window.location.hash) {
            const { access_token, expires_in, token_type } =
            getReturnedParamsFromSpotifyAuth(window.location.hash);
            localStorage.clear();
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("tokenType", token_type);
            localStorage.setItem("expiresIn", expires_in);
        }
        if(localStorage.getItem("accessToken")){

            axios.get(PROFILE_ENDPOINT, {
                headers:{ 
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                if(response.data){
                    define_globals(response.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, []);

    const [data, setData] = useState();

    useEffect(() => {
        if(localStorage.getItem("accessToken")){
            axios.get(TOP_TRACKS_ENDPOINT, {
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
    }, [data]);

    const [data_month, setDataMonth] = useState();

    useEffect(() => {
        if(localStorage.getItem("accessToken")){
            axios.get(TOP_TRACKS_ENDPOINT_MONTH, {
                headers:{ 
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                setDataMonth(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, [data_month]);
    
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const define_globals = (data) => {
        localStorage.setItem("profileImage", data.images[0].url);
        localStorage.setItem("profileName", data.display_name);
    } 

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Home
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
                        <MenuItem onClick={handleClose}>Reset password</MenuItem>
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
                    <Typography variant="h5" align = "center"> {localStorage.getItem("profileName")} </Typography>
                <List>
                    <ListItem button selected onClick={() => { navigate("/home", { replace: true }) }}>
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

                    <ListItem button onClick={() => { navigate("/match_playlists", { replace: true }) }}>
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
                    background: "linear-gradient(180deg, rgba(26,197,83,1) 0%, rgba(26,197,83,0.75) 25%, rgba(26,197,83,0.5) 50%, rgba(26,197,83,0.25) 75%, rgba(26,197,83,0) 100%)",
                    p: 3
                }}
            >
                <Toolbar />
                <Typography variant="h3">Last Week</Typography>
                <ImageList sx={{ width: '100%', height: 600 }} cols = { 5 } >
                    {data?.items ? data.items.map((item, index) =>
                            (
                            <ImageListItem key={item.images}>
                            <img
                                src={`${item.album.images[1].url}`}
                                alt={item.name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title= {"#"+ (index+1)+ " " + item.name }
                                position="side"
                            />
                            </ImageListItem>
                        ))
                        : null
                    }
                    </ImageList>
                 
                <Typography variant="h3">Last Month</Typography>
                <ImageList sx={{ width: '100%', height: 600 }} cols = { 5 } >
                    {data_month?.items ? data_month.items.map((item, index) =>
                            (
                            <ImageListItem key={item.images}>
                            <img
                                src={`${item.album.images[1].url}`}
                                alt={item.name}
                                loading="lazy"
                            />
                            <ImageListItemBar
                                title= {"#"+ (index+1)+ " " + item.name }
                                position="side"
                            />
                            </ImageListItem>
                        ))
                        : null
                    }
                    </ImageList>
                <Typography variant="h3">Charts</Typography>
            </Box>
        </Box>
    );
}
