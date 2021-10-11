import React from "react";
import Grid from "@material-ui/core/Grid";
import { Hidden } from "@material-ui/core";

import HomeTopBanner from "../components/Adithya/HomeTopBanner";
import HomeCarousal from "../components/Adithya/HomeCarousal";
import HomeTerminals from "../components/Adithya/HomeTerminals";
import Footer from "../components/Adithya/Footer";
import Header from "../components/Adithya/Header";

const Home = () => {
  return (
    <>
      <Header />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="m-1">
            <HomeTopBanner />
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="my-8 ">
            <div className=" font-fatKidFont pb-2 pl-16 sm:pl-4 lg:text-2xl md:text-md sm:text-md font-semibold">
              Lowdown got lifted. Now it's your chance to close your distance
              with loved ones again.but,
            </div>
            <h3 className="text-3xl font-fatKidFont pl-16 sm:pl-4 lg:mb-20 ">
              Safety First
            </h3>
            <Grid
              item
              xs={12}
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Hidden only={["sm", "xs"]}>
                <Grid item xs={4}>
                  <div className="mt-10 m-auto mb-3 w-3/4 flex justify-center">
                    <img
                      alt="home-side-img"
                      src="https://i.ibb.co/cY9rmdg/puzzle-23.png"
                      width="80%"
                      height="80%"
                      border="0"
                      className="object-contain rounded-full"
                    ></img>
                  </div>
                </Grid>
              </Hidden>
              <Grid item xs={12} md={8}>
                <div className=" m-auto">
                  <HomeCarousal />
                </div>
              </Grid>
            </Grid>
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className="my-8">
            <h3 className="text-3xl font-boldTallFont pl-16 sm:pl-4 lg:mb-20">
              Our Terminals
            </h3>
            <div className="w-3/4 m-auto">
              <HomeTerminals />
            </div>
          </div>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Home;
