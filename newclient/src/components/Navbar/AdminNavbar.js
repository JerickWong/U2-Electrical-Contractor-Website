import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import clsx from "clsx";
import {
  makeStyles,
  Button,
  useTheme,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Grid,
  Container,
  CssBaseline,
  IconButton,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import {
  Assignment,
  LocalOffer,
  NoteAdd,
  Menu,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  VerifiedUser,
  SupervisorAccount,
} from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import indigo from "@material-ui/core/colors/indigo";
import grey from "@material-ui/core/colors/grey";
import "../../styles/navbar.css";
// import firebase from "firebase";
// import Authenticate from "../Firestore/auth";
import { Redirect } from "react-router-dom";
import users from "../../api/users";

const drawerWidth = 220;
const light = indigo[50];
const dark = grey[800];
const primary = "#8083FF";
const white = "#FFFFFF";
const lightIndigo = "#CDCFEF";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: white,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    backgroundColor: dark,
  },
  drawerOpen: {
    backgroundColor: dark,
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: dark,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  login: {
    color: white,
  },
  username: {
    marginLeft: 10,
    color: lightIndigo,
  },
  logout: {
    marginLeft: 15,
    color: white,
  },
  listIcon: {
    color: light,
  },
  navbarContainer:{
    marginLeft: 270
  }
}));

function AdminNavbar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(" ");

  const handleDrawerOpen = () => {
    setOpen(true);
    if (props.setIsOpen)
      props.setIsOpen(true)
  };

  const handleDrawerClose = () => {
    setOpen(false);
    if (props.setIsOpen)
      props.setIsOpen(false)
  };

  // firebase.auth().onAuthStateChanged(user => {
  //   if (user) {
  //       setUser(user.displayName)
  //   } else {
  //       setUser('')
  //   }
  // })

  const isLoggedin = () => {
    if (user == null) {
      alert("not logged in");
      return <Redirect to="/" />;
    }
    if (user.type === "Employee") return <Redirect to="/Mts" />;
    console.log(user);
  };

  const fetchUser = async () => {
    try {
      const data = (
        await users.getUser({ token: localStorage.getItem("token") })
      ).data.data;

      setUser(data);
    } catch (error) {
      setUser(null);
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.setItem("token", "");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // function refreshPage() {
  //   window.location.reload(false);
  // }

  return (
    <div className={classes.root}>
      {isLoggedin()}
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, { [classes.appBarShift]: open })}
        >
          <Toolbar style={{ backgroundColor: primary }}>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, { [classes.hide]: open })}
            >
              <Menu />
            </IconButton>
            <Container className={classes.navbarContainer} maxWidth="md">
              <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
              >
                <Typography className={classes.login}>
                  Logged in as:{" "}
                </Typography>
                <Typography className={classes.username}>
                  {user ? user.username : ""}
                </Typography>
                <Link to="/">
                  <Button
                    className={classes.logout}
                    endIcon={<ExitToAppIcon />}
                    onClick={handleLogout}
                  >
                    {" "}
                    Logout{" "}
                  </Button>
                </Link>
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          style={{ backgroundColor: dark }}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton style={{ color: light }} onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to="/AdminMtsWindow">
              <ListItem button key="New MTS">
                <ListItemIcon className={classes.listIcon}>
                  <NoteAdd />
                </ListItemIcon>
                <ListItemText className={classes.listIcon} primary="New MTS" />
              </ListItem>
            </Link>
            <Link to="/AdminMts">
              <ListItem button key="MTS List">
                <ListItemIcon className={classes.listIcon}>
                  <Assignment />
                </ListItemIcon>
                <ListItemText className={classes.listIcon} primary="MTS List" />
              </ListItem>
            </Link>
            <Link to="/AdminPrice">
              <ListItem button key="Price List">
                <ListItemIcon className={classes.listIcon}>
                  <LocalOffer />
                </ListItemIcon>
                <ListItemText
                  className={classes.listIcon}
                  primary="Price List"
                />
              </ListItem>
            </Link>
            <Link to="/Cost">
              <ListItem button key="Cost">
                <ListItemIcon className={classes.listIcon}>
                  <TrendingUp />
                </ListItemIcon>
                <ListItemText className={classes.listIcon} primary="Cost" />
              </ListItem>
            </Link>
            <Link to="/Deliver">
              <ListItem button key="Delivered">
                <ListItemIcon className={classes.listIcon}>
                  <VerifiedUser />
                </ListItemIcon>
                <ListItemText
                  className={classes.listIcon}
                  primary="Delivered"
                />
              </ListItem>
            </Link>
            {
              user && user.type === "Admin" &&
              <Link to="/Accounts">
                <ListItem button key="Accounts">
                  <ListItemIcon className={classes.listIcon}>
                    <SupervisorAccount />
                  </ListItemIcon>
                  <ListItemText className={classes.listIcon} primary="Accounts" />
                </ListItem>
              </Link>
            }
            </List>
        </Drawer>
      </MuiThemeProvider>
    </div>
  );
}

export default AdminNavbar;
