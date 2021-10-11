import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import ViewJourneys from "../components/Randika/ViewJourneys";

import AddJourneys from "../components/Randika/AddJourneys";
import ManagerDashboard from "../components/Randika/ManagerDashboard";
import Transporters from "../components/Randika/Transporters";
import Terminals from "../components/Randika/Terminals";
import Inquaries from "../components/Randika/Inquaries";

const drawerWidth = 250;

const DeliveryDashboard = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#042B58",
    [theme.breakpoints.up("md")]: {},
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const history = useHistory();
  const classes = DeliveryDashboard();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [openManagerDashboard, setOpenManagerDashboard] = useState(true);

  const [addJourneys, setaddJourneys] = useState(false);
  const [openViewJourneys, setopenViewJourneys] = useState(false);
  const [openTransporters, setOpenTransporters] = useState(false);
  const [openInquaries, setOpenInquariess] = useState(false);
  const [openTerminals, setOpenTerminals] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    history.push("/admin-login");
  };

  const drawer = (
    <div className="bg-lightSilver " style={{ height: "1000px" }}>
      <div className={classes.toolbar} />
      <div className="mt-10 mx-16 mb-3">
        <Avatar style={{ width: "120px", height: "120px", margin: "auto" }} />
      </div>
      <div className="mt-2 mx-5 mb-8">
        <Typography variant="h6" noWrap className="text-center">
          Manager
        </Typography>
      </div>
      <List>
        <ListItem button>
          <ListItemText
            primary={"Dashboard"}
            onClick={() => {
              setaddJourneys(false);
              setopenViewJourneys(false);
              setOpenTransporters(false);
              setOpenInquariess(false);
              setOpenTerminals(false);
              setOpenManagerDashboard(true);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={"Add Journeys"}
            onClick={() => {
              setOpenManagerDashboard(false);
              setopenViewJourneys(false);
              setOpenTransporters(false);
              setOpenInquariess(false);
              setOpenTerminals(false);
              setaddJourneys(true);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={"Journeys"}
            onClick={() => {
              setaddJourneys(false);
              setOpenManagerDashboard(false);
              setOpenTransporters(false);
              setOpenInquariess(false);
              setOpenTerminals(false);
              setopenViewJourneys(true);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={"Transporters"}
            onClick={() => {
              setopenViewJourneys(false);
              setaddJourneys(false);
              setOpenManagerDashboard(false);
              setOpenInquariess(false);
              setOpenTerminals(false);
              setOpenTransporters(true);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={"Terminals"}
            onClick={() => {
              setopenViewJourneys(false);
              setaddJourneys(false);
              setOpenManagerDashboard(false);
              setOpenInquariess(false);
              setOpenTransporters(false);
              setOpenTerminals(true);
            }}
          />
        </ListItem>
        <ListItem button>
          <ListItemText
            primary={"Inquaries"}
            onClick={() => {
              setOpenTransporters(false);
              setopenViewJourneys(false);
              setaddJourneys(false);
              setOpenManagerDashboard(false);
              setOpenTerminals(false);
              setOpenInquariess(true);
            }}
          />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container justifyContent="flex-start">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <h6 className={" text-3xl font-black "}>Manager Dashboard</h6>
          </Grid>
          <Grid container justifyContent="flex-end">
            <button
              className="bg-gamboge hover:bg-halloweenOrange text-md text-white font-bold py-2 px-6 rounded-full"
              style={{
                boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
              }}
              onClick={logOutHandler}
            >
              LogOut
            </button>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {/* 
        
     
        {ManagerDashboard && <Discount />}
       

*/}
        {/* {openAdminUsers && <ViewJourneys />} */}
        {openTerminals && <Terminals />}
        {openInquaries && <Inquaries />}
        {openTransporters && <Transporters />}
        {openManagerDashboard && <ManagerDashboard />}
        {openViewJourneys && <ViewJourneys />}
        {addJourneys && <AddJourneys />}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
