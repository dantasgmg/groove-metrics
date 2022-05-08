import * as React from 'react';
import { useEffect } from "react";
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

const drawerWidth = 260;

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
        console.log(localStorage.getItem("accessToken"));
    });

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    <Avatar sx={{ width: 160, height: 160 }}>H</Avatar>
                </Box>
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

                    <ListItem button onClick={() => { navigate("/settings", { replace: true }) }}>
                        <ListItemIcon>
                            <Cog />
                        </ListItemIcon>
                        <ListItemText primary={"Settings"} />
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
                <Typography variant="h3">Last Month</Typography>
                <Typography variant="h3">Charts</Typography>
            </Box>
        </Box>
    );
}
