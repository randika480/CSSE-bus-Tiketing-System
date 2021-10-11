import React from "react";
import Grid from "@material-ui/core/Grid";
import RegistrationForm from "../components/Adithya/RegistrationForm";
import Footer from "../components/Adithya/Footer";
import Header from "../components/Adithya/Header";
import { Hidden } from "@material-ui/core";

const Registration = () => {
  return (
    <>
      <Header />
      <div className="lg:px-20 md:px-9 sm:px-4">
        <Grid
          container
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} sm={12} md={5}>
            <div className=" border-lightSilver rounded-2xl border-8 shadow-2xl my-8 p-5 lg:pl-8 pt-6">
              <RegistrationForm />
            </div>
          </Grid>
          <Hidden only={["sm", "xs", "md"]}>
            <Grid item md={4}>
              <div className="my-8 text-center">
                <img
                  src="https://i.ibb.co/51235MY/puzzle-security.png"
                  alt="reg-page-img"
                />
              </div>
            </Grid>
          </Hidden>
        </Grid>
      </div>
      <Footer />
    </>
  );
};

export default Registration;
