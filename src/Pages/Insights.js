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
import { HomeVariant, ChartBar, PlaylistMusic, AccountGroup, Cog, AccountCircle } from "mdi-material-ui"
import { useNavigate } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { minHeight } from '@mui/system';
const drawerWidth = 260;

const TRACKS_ENDPOINT = "https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=1&offset=0";
const ARTISTS_ENDPOINT = "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=1&offset=0";
const PODCASTS_ENDPOINT = "https://api.spotify.com/v1/me/shows?offset=0&limit=10";
function valuetext(value) {
    return `${value}`;
  }

export default function Insights() {

    const [period, setPeriod] = React.useState('');

    const handleChange = (event) => {
      setPeriod(event.target.value);
    };
    const [quant, setQuant] = React.useState('');

    const handleChange_quant = (event) => {
      setQuant(event.target.value);
    };


    
    const [consumable, setConsumable] = React.useState('');

    const handleChange_consumable = (event) => {
        setConsumable(event.target.value);
      };
    const [data_p, setData_p] = useState({});
    const [data_a, setData_a] = useState({});
    const [data_t, setData_t] = useState({});
    const FORM_ENDPOINT = `https://api.spotify.com/v1/me/top/${consumable}?time_range=${period}&limit=${quant}&offset=0`;
    const [token, setToken] = useState("");
    const [data_f, setData_f] = useState({});

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setToken(localStorage.getItem("accessToken"));
    }
  }, []);
    const [typet, setTypet] = useState("");
    const calltheform = () => { 
        axios
          .get(FORM_ENDPOINT, {
            headers: {
              Authorization: "Bearer " + token,
            },
          })
          .then((response) => {
            setData_f(response.data);
            setTypet(consumable);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
    useEffect(() => {


        if(localStorage.getItem("accessToken")){

            axios.get(TRACKS_ENDPOINT, {
                headers:{ 
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                setData_t(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

            axios.get(PODCASTS_ENDPOINT, {
                headers:{ 
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                setData_p(response.data);
            })
            .catch((error) => {
                console.log(error);
            });            

            axios.get(ARTISTS_ENDPOINT, {
                headers:{ 
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((response) => {
                setData_a(response.data);
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

    return (
        <Box sx={{ display: 'flex' }}>

            <AppBar
                position="fixed"
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Insights
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
                    <ListItem button onClick={() => { navigate("/home", { replace: true }) }}>
                        <ListItemIcon>
                            <HomeVariant />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItem>

                    <ListItem button selected onClick={() => { navigate("/insights", { replace: true }) }}>
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
                    background: "linear-gradient(180deg, rgba(128,25,216,1) 0%, rgba(128,25,216,0.75) 25%, rgba(128,26,216,0.5) 50%, rgba(128,25,216,0.25) 75%, rgba(128,25,216,0) 100%)",
                    p: 3
                }}
            >
            <Toolbar />
                <Typography variant="h3">Descubra seu som!</Typography>
                <Grid container sx={{ mb: 0 }} direction = {"row"}>
                    <Grid item xs={12} sm = {12} md = {6} lg = {6} >
                        <Typography variant="h4">Top #1 Artist</Typography>

                        <ImageList sx={{ width: '190%', height:"75%"}} >
                            {data_a?.items ? data_a.items.map((item) =>  
                                    (
                                    <ImageListItem key={item.images} >
                                    <img
                                        src={`${item.images[0].url}?w=650&h=650&fit=crop&auto=format`}
                                        alt={item.name}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={item.name}
                                        position="side"
                                    />
                                    </ImageListItem>
                                ))
                                : null}
                        </ImageList>
                    </Grid>
                    <Grid item xs={12} sm = {12} md = {6} lg = {6} >
                        <Typography variant="h4">Top #1 Music</Typography>
                        <ImageList sx={{ width: "190%", height: "75%"}} >
                            {data_t?.items ? data_t.items.map((item) =>  
                                    (
                                    <ImageListItem key={item.images} >
                                    <img
                                        src={`${item.album.images[0].url}?w=650&h=650&fit=crop&auto=format`}
                                        alt={item.name}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={item.name}
                                        position="side"
                                    />
                                    </ImageListItem>
                                ))
                                : null}
                        </ImageList>
                    </Grid>
                </Grid>
                <Grid container sx={{ mb: 8 }}>
                    <Grid xs={12} sm = {12} md = {12} lg = {12} >
                        <Typography variant="h4">Favourite episodes</Typography>
                        
                        <ImageList sx={{ width: "100%", height: "100%"}} cols = {5}>
                            {data_p?.items ? data_p.items.map((item) =>  
                                    (
                                    <ImageListItem key={item.images} >
                                    <img
                                        src={`${item.show.images[1].url}?w=320&h=320&fit=crop&auto=format`}
                                        alt={item.name}
                                        loading="lazy"
                                        position="right"
                                    />
                                    <ImageListItemBar
                                        title={item.name}
                                        position="below"
                                    />
                                    </ImageListItem>
                                ))
                                : null}
                        </ImageList>
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid xs={12} sm = {12} md = {12} lg = {12} >
                        <Typography variant="h4">Whant find out your sound?</Typography>    
                        <div>
                            <FormControl sx={{ m: 1, minWidth: "25%" }}>
                                <InputLabel id="demo-simple-select-label">Period</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={period}
                                label="Period"
                                defaultValue={"long_term"}
                                onChange={handleChange}
                                >
                                <MenuItem value={"short_term"}>Last Month</MenuItem>
                                <MenuItem value={"medium_term"}>Last Semester</MenuItem>
                                <MenuItem value={"long_term"}>All Time</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: "25%"}}>
                                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={consumable}
                                label="Type"
                                defaultValue={"artists"}
                                onChange={handleChange_consumable}
                                >
                                <MenuItem value={"artists"}>Artists</MenuItem>
                                <MenuItem value={"tracks"}>Tracks</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: "25%"}}>
                                <InputLabel id="demo-simple-select-label">Amount</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={quant}
                                label="Amount"
                                defaultValue={"10"}
                                onChange={handleChange_quant}
                                >
                                <MenuItem value={"1"}>1</MenuItem>
                                <MenuItem value={"10"}>10</MenuItem>
                                <MenuItem value={"20"}>20</MenuItem>
                                <MenuItem value={"30"}>30</MenuItem>
                                <MenuItem value={"40"}>40</MenuItem>
                                <MenuItem value={"50"}>50</MenuItem>
                                </Select>
                            </FormControl>
                        <Button onClick={() => {calltheform()}} 
                            sx ={{ minWidth: "20%", minHeight: 55, mt: 1 }} variant="contained">Go</Button>
                        </div>
                        <ImageList sx={{ width: "100%", height: "100%"}} cols = {5}>
                            {data_f?.items ? data_f.items.map((item) =>  
                                    (
                                    <ImageListItem key={item.images} >
                                    <img
                                        src={typet == "artists" ? `${item.images[1].url}?w=320&h=320&fit=crop&auto=format` :`${item.album.images[0].url}?w=320&h=320&fit=crop&auto=format` }
                                        alt={item.name}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={item.name}
                                        position="side"
                                    />
                                    </ImageListItem>
                                ))
                                : null}
                        </ImageList>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}














