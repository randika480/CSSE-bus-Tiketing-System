import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import Header from "../components/Adithya/Header";
import Footer from "../components/Adithya/Footer";
import PassengerDashboard from "../components/Adithya/PassengerDashboard";

const PassengerProfile = () => {
  const history = useHistory();
  useEffect(() => {
    if (
      !localStorage.getItem("authToken") ||
      localStorage.getItem("userRole") !== "passenger"
    ) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      history.push("/");
    }
  }, [history]);
  return (
    <>
      <Header />
      <PassengerDashboard />
      <Footer />
    </>
  );
};

export default PassengerProfile;
