import React from "react";
import DailyJourneyChart from "./DailyJourneyChart";
import Grid from "@material-ui/core/Grid";
import Cost from "./cost";
import DashboardJourneys from "./DashBoardJourneys";
import RevenueChart from "./RevenueChart";

const ManagerDashboard = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={5}>
          <Grid item md={12}>
            <DailyJourneyChart />
          </Grid>
          <Grid item md={12}>
            <RevenueChart />
          </Grid>
        </Grid>
        <Grid item md={7}>
          <Grid item md={12}>
            <DashboardJourneys />
          </Grid>
          <Grid item md={12}>
            <Cost />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ManagerDashboard;
