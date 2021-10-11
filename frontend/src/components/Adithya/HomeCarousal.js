import React from "react";
import Slider from "react-slick";

const HomeCarousal = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 1000,
    dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToScroll: 1,
  };

  const data = [
    { src: "https://i.ibb.co/hWPw0MX/cherry-stopping-covid-19.png" },
    {
      src: "  https://i.ibb.co/tY9KRrF/comet-covid-19-rider-flyer-8-5x11-v-1-scaled-1.jpg",
    },
    {
      src: "https://i.ibb.co/cJ2QxYW/COVID-19-Stay-Safe-Guidelines-Screen-Poster-public-transport-1.jpg",
    },
  ];

  return (
    <div className="grid-flow-col col-span-2 pt-4 flex justify-center flex-col">
      <div className="mx-20">
        {data && (
          <Slider {...settings}>
            {data.map((item, index) => {
              return (
                <div key={index}>
                  <img
                    alt="home-slider"
                    src={item.src}
                    border="0"
                    width="50%"
                    className="object-contain m-auto "
                  ></img>
                </div>
              );
            })}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default HomeCarousal;
