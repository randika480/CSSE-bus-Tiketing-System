import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BusAlertRoundedIcon from "@mui/icons-material/BusAlertRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";
import TimelineRoundedIcon from "@mui/icons-material/TimelineRounded";
import PassengerProfileOption from "./PassengerProfileOption";
import TokenRechargeOption from "./TokenRechargeOption";
import JourneyManageOption from "./JourneyManageOption";
import JourneyHistoryOption from "./JourneyHistoryOption";
import PaymentHistoryOption from "./PaymentHistoryOption";

const PassengerDashboard = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className=" min-h-screen p-10 ">
      <Grid container spacing={5}>
        <Grid item xs={12} md={3}>
          <Box
            className="border"
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <List component="nav">
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <AccountCircleRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
              <Divider />
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText primary="Recharge Token" />
              </ListItemButton>
              <Divider />
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <BusAlertRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Start Journey" />
              </ListItemButton>
              <Divider />
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemIcon>
                  <HistoryRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Journey History" />
              </ListItemButton>
              <Divider />
              <ListItemButton
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
              >
                <ListItemIcon>
                  <TimelineRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Payment History" />
              </ListItemButton>
            </List>
          </Box>
        </Grid>

        <Grid item xs={12} md={9} className="border-4 rounded">
          {selectedIndex === 0 && (
            <div>
              <PassengerProfileOption />
            </div>
          )}
          {selectedIndex === 1 && (
            <div>
              <TokenRechargeOption />
            </div>
          )}
          {selectedIndex === 2 && (
            <div>
              <JourneyManageOption />
            </div>
          )}
          {selectedIndex === 3 && (
            <div>
              <JourneyHistoryOption />
            </div>
          )}
          {selectedIndex === 4 && (
            <div>
              <PaymentHistoryOption />
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default PassengerDashboard;
