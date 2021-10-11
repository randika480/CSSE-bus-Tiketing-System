import React from "react";

const HomeTopBanner = () => {
  return (
    <div
      className="bg-blue-200 bg-cover bg-fixed bg-center bg-no-repeat rounded-b-xl px-0"
      style={{
        backgroundImage: `url("https://i.ibb.co/1d31TPP/tweed-bus-services.jpg")`,
      }}
    >
      <div className="container flex justify-between align-bottom pt-80 pb-12">
        <div className=" lg:pl-7">
          <div className=" lg:text-7xl text-ferrariRed  md:text-5xl sm:text-4xl font-fatKidFont">
            Travel with the <em>New Normal</em> safety precautions
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTopBanner;
