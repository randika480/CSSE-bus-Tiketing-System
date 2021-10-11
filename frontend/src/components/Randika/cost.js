/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

const Cost = () => {
  const [busCost, setbusCost] = useState("");
  const [trainCost, settrainCost] = useState("");
  //fetch costs
  const getCost = async () => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/manager/getCosts")
        .then((res) => {
          settrainCost(res.data.Costs[1].costPerKm);
          setbusCost(res.data.Costs[0].costPerKm);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  useEffect(() => {
    getCost();
  }, []);

  return (
    <div className="w-full p-3 h-max mb-3 pt-0">
      <div className="w-full h-max bg-white shadow-2xl p-5 pt-5">
        <h1 className="text-center font-bold font-sans text-lg ">
          Cost Per 1KM
        </h1>
        <div className="w-full m-auto h-4/5 p-5">
          <Grid container spacing={2}>
            <Grid item md={6}>
              <h1 className="text-center font-bold font-sans text-lg">Bus</h1>
            </Grid>
            <Grid item md={6}>
              <h1 className="text-center font-bold font-sans text-lg">
                Rs. {busCost}
              </h1>
            </Grid>
            <Grid item md={6}>
              <h1 className="text-center font-bold font-sans text-lg">Train</h1>
            </Grid>
            <Grid item md={6}>
              <h1 className="text-center font-bold font-sans text-lg">
                Rs. {trainCost}
              </h1>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Cost;
