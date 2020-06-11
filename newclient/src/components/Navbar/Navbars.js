import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import clsx from 'clsx';
import { makeStyles, useTheme, Drawer, AppBar, Toolbar, List, CssBaseline, IconButton, Divider, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { Description, Assignment, LocalOffer, NoteAdd, Menu, ChevronLeft, ChevronRight, MailRounded } from '@material-ui/icons';
import { createMuiTheme } from '@material-ui/core/styles';
import '../../styles/navbar.css';

const drawerWidth = 240;
const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#EBE5FF',
      main: '#8083FF',
      dark: '#474554',
      contrastText: '#FAF8FF',
    },
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  log: {
    flexGrow: 1,
  }
}));

function Navbars() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarShift]: open, })}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, { [classes.hide]: open, })}>
            <Menu />
            <Typography>Logged in as: User1</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer 
        variant="permanent" 
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}>
       <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>  
        <Divider />
        <List>
          <ListItem button key ="New MTS">
            <ListItemIcon><NoteAdd/></ListItemIcon>
            <ListItemText primary="New MTS"/>
          </ListItem>
          <ListItem button key ="MTS List">
            <ListItemIcon><Assignment/></ListItemIcon>
            <ListItemText primary="MTS List"/>
          </ListItem>
          <ListItem button key ="New Quotation">
            <ListItemIcon><Description/></ListItemIcon>
            <ListItemText primary="New Quotation"/>
          </ListItem>
          <ListItem button key ="Price List">
            <ListItemIcon><LocalOffer/></ListItemIcon>
            <ListItemText primary="Price List"/>
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Navbars;