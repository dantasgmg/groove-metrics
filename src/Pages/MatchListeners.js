import * as React from 'react';
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
import { HomeVariant, ChartBar, PlaylistMusic, AccountGroup, Cog, AccountCircle, Cancel, Headphones } from "mdi-material-ui";
import { useNavigate } from "react-router-dom";
import ReactCardCarousel from "react-card-carousel";
import Paper from "@mui/material/Paper";
import Fab from '@mui/material/Fab';
import Grid from "@mui/material/Grid";

const drawerWidth = 260;

export default function MatchListeners() {
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
                        Match Listeners
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

                    <ListItem button onClick={() => { navigate("/match_playlists", { replace: true }) }}>
                        <ListItemIcon>
                            <PlaylistMusic />
                        </ListItemIcon>
                        <ListItemText primary={"Match Playlists"} />
                    </ListItem>

                    <ListItem button selected onClick={() => { navigate("/match_listeners", { replace: true }) }}>
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
                    background: "linear-gradient(180deg, rgba(255,0,0,1) 0%, rgba(255,0,0,0.75) 25%, rgba(255,0,0,0.5) 50%, rgba(255,0,0,0.25) 75%, rgba(255,0,0,0) 100%)",
                    p: 3
                }}
            >
                <Toolbar />
                <Typography variant="h3">Listener Matching</Typography>
                <Box sx={{
                    position: "relative",
                    height: 500,
                    width: "100%",
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "middle",
                }}>
                    <ReactCardCarousel autoplay={false}>
                        <Paper sx={{
                            height: "auto",
                            width: 300,
                            padding: "40px",
                            boxSizing: "border-box",
                        }}>
                            <Box sx={{
                                mt: 3,
                                mb: 3,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Avatar sx={{ width: 160, height: 160 }}>H</Avatar>
                            </Box>
                            <Typography variant="h5" align="center" sx={{ mb: 3 }}>Nome, Idade</Typography>
                            <Grid container>
                                <Grid item sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                }}
                                    xs={6}>
                                    <Fab>
                                        <Cancel />
                                    </Fab>
                                </Grid>
                                <Grid item sx={{
                                    display: "flex",
                                    justifyContent: "right",
                                }} xs={6}>
                                    <Fab>
                                        <Headphones />
                                    </Fab>
                                </Grid>
                            </Grid>
                            <Typography sx={{ mt: 3 }}>
                                Curte:
                            </Typography>
                        </Paper>

                        <Paper sx={{
                            height: "auto",
                            width: 300,
                            padding: "40px",
                            boxSizing: "border-box",
                        }}>
                            <Box sx={{
                                mt: 3,
                                mb: 3,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Avatar sx={{ width: 160, height: 160 }}>H</Avatar>
                            </Box>
                            <Typography variant="h5" align="center" sx={{ mb: 3 }}>Nome, Idade</Typography>
                            <Grid container>
                                <Grid item sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                }}
                                    xs={6}>
                                    <Fab>
                                        <Cancel />
                                    </Fab>
                                </Grid>
                                <Grid item sx={{
                                    display: "flex",
                                    justifyContent: "right",
                                }} xs={6}>
                                    <Fab>
                                        <Headphones />
                                    </Fab>
                                </Grid>
                            </Grid>
                            <Typography sx={{ mt: 3 }}>
                                Curte:
                            </Typography>
                        </Paper>

                        <Paper sx={{
                            height: "auto",
                            width: 300,
                            padding: "40px",
                            boxSizing: "border-box",
                        }}>
                            <Box sx={{
                                mt: 3,
                                mb: 3,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Avatar sx={{ width: 160, height: 160 }}>H</Avatar>
                            </Box>
                            <Typography variant="h5" align="center" sx={{ mb: 3 }}>Nome, Idade</Typography>
                            <Grid container>
                                <Grid item sx={{
                                    display: "flex",
                                    justifyContent: "left",
                                }}
                                    xs={6}>
                                    <Fab>
                                        <Cancel />
                                    </Fab>
                                </Grid>
                                <Grid item sx={{
                                    display: "flex",
                                    justifyContent: "right",
                                }} xs={6}>
                                    <Fab>
                                        <Headphones />
                                    </Fab>
                                </Grid>
                            </Grid>
                            <Typography sx={{ mt: 3 }}>
                                Curte:
                            </Typography>
                        </Paper>
                    </ReactCardCarousel>
                </Box>
            </Box>
        </Box>
    );
}