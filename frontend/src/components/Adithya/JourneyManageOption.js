import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const JourneyManageOption = () => {
  const [start, setStart] = useState(false);
  const [journeyID, setJourneyID] = useState(null);
  const [journeyData, setJourneyData] = useState(null);
  const [terminalID, setTerminalID] = useState(null);
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [endModalOpen, setEndModalOpen] = useState(false);
  const [allJourneys, setAllJourneys] = useState(null);

  useEffect(() => {
    const getAllJourneys = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      await axios
        .get("http://localhost:6500/matrix/api/passenger/get-token", config)
        .then((res) => {
          localStorage.setItem(
            "passengerTokenID",
            res?.data?.passengerToken?._id
          );
          console.log(res?.data?.passengerToken);
        })
        .catch((err) => {
          alert(err?.response?.data?.desc);
        });
      await axios
        .get("http://localhost:6500/matrix/api/passenger/get-journeys")
        .then((res) => {
          setAllJourneys(res?.data?.journeys);
          console.log(res?.data?.journeys);
        })
        .catch((err) => {
          alert(err?.response?.data?.desc);
        });
    };
    getAllJourneys();
  }, []);

  const getJourneyData = async (journeyID) => {
    await axios
      .get(
        `http://localhost:6500/matrix/api/passenger/get-journey/${journeyID}`
      )
      .then((res) => {
        setJourneyData(res?.data?.journey);
        console.log(res?.data?.journey);
      })
      .catch((err) => {
        alert(err?.response?.data?.desc);
      });
  };

  const initiateJourney = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const data = {
      tokenID: localStorage.getItem("passengerTokenID"),
      journeyID,
      getInLocation: terminalID,
    };
    await axios
      .put(
        `http://localhost:6500/matrix/api/passenger/initiate-journey`,
        data,
        config
      )
      .then((res) => {
        alert(res?.data?.desc);
        setStart(true);
      })
      .catch((err) => {
        alert(err?.response?.data?.desc);
      });
  };

  const completeJourney = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const data = {
      tokenID: localStorage.getItem("passengerTokenID"),
      initiatedJourneyID: journeyID,
      getOffLocation: terminalID,
    };
    await axios
      .put(
        `http://localhost:6500/matrix/api/passenger/complete-journey`,
        data,
        config
      )
      .then((res) => {
        alert(res?.data?.desc);
        setStart(true);
      })
      .catch((err) => {
        alert(err?.response?.data?.desc);
      });
  };

  return (
    <>
      <div className="grid grid-cols-2 pr-24">
        <div className="flex flex-col w-1/2">
          <button
            type="submit"
            className="hover:bg-halloweenOrange bg-gamboge ml-8 text-white font-semibold text-lg rounded py-2 px-6 mt-4"
            style={{
              boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
            }}
            onClick={() => {
              if (start) {
                alert(
                  "You have pending started journey, please complete it before initiating new one"
                );
              } else {
                setStartModalOpen(true);
              }
            }}
          >
            Start Journey
          </button>
          <button
            type="submit"
            className={`${
              start ? "bg-gamboge" : "bg-gray-500"
            }  ml-8 text-white font-semibold text-lg rounded py-2 px-6 mt-4`}
            style={{
              boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
            }}
            onClick={() => {
              if (start) {
                setEndModalOpen(true);
              } else {
                alert("Please initiate a journey first");
              }
            }}
          >
            Complete Journey
          </button>
        </div>
        <div className="border-2">
          <div className="text-center text-xl font-boldTallFont">
            Current Journey
          </div>
          <div className="my-8 mx-12 grid grid-cols-2 font-semibold">
            <div className="my-2 ">Departure</div>
            <div className="my-2">{journeyData?.departure}</div>
            <div className="my-2">Destination</div>
            <div className="my-2">{journeyData?.destination}</div>
            <div className="my-2">Take Off Time</div>
            <div className="my-2">{journeyData?.takeOffTime}</div>
            <div className="my-2">Arrival Time</div>
            <div className="my-2">{journeyData?.arrivalTime}</div>
            <div className="my-2">Availability</div>
            <div className="my-2">{journeyData?.availability}</div>

            {!start && journeyData ? (
              <>
                <div className="my-2">Available Terminals</div>
                <div className="my-2">
                  <Box>
                    <FormControl fullWidth>
                      <Select
                        labelId="category"
                        id="category"
                        size="small"
                        label="Terminals"
                        value={terminalID}
                        onChange={(e) => {
                          setTerminalID(e.target.value);
                        }}
                      >
                        {journeyData?.availableTerminals?.map((item, index) => {
                          return (
                            <MenuItem key={index} value={item._id}>
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                </div>
              </>
            ) : null}
          </div>
          {!start ? (
            <>
              {journeyData?.availableTerminals?.length > 0 && (
                <button
                  onClick={() => {
                    initiateJourney();
                  }}
                  className="ml-12 bg-gamboge text-white font-semibold text-md rounded py-2 px-3 my-4"
                >
                  CONFIRM
                </button>
              )}
            </>
          ) : null}
        </div>
      </div>
      {startModalOpen && (
        <Modal
          open={startModalOpen}
          onClose={() => setStartModalOpen(false)}
          center
          styles={{
            modal: {
              border: "1px solid  gray",
              borderRadius: "8px",
              width: "30%",
            },
          }}
          focusTrapped={true}
        >
          {allJourneys && (
            <div>
              <div className="mb-4 font-semibold">Available Journeys List</div>
              <Box>
                <FormControl fullWidth>
                  <InputLabel id="category">Journeys</InputLabel>
                  <Select
                    labelId="category"
                    id="category"
                    label="Journeys"
                    value={journeyID}
                    onChange={(e) => {
                      setJourneyID(e.target.value);
                      getJourneyData(e.target.value);
                    }}
                  >
                    {allJourneys.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item._id}>
                          {item.departure}({item.takeOffTime}) -{"  "}
                          {item.destination}({item.arrivalTime})
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </div>
          )}
        </Modal>
      )}
      {endModalOpen && (
        <Modal
          open={endModalOpen}
          onClose={() => setEndModalOpen(false)}
          center
          styles={{
            modal: {
              border: "1px solid  gray",
              borderRadius: "8px",
              width: "30%",
            },
          }}
          focusTrapped={true}
        >
          {allJourneys && (
            <div>
              <div className="mb-4 font-semibold">Available Terminals</div>
              <Box>
                <FormControl fullWidth>
                  <InputLabel id="category2">Terminals</InputLabel>
                  <Select
                    labelId="category2"
                    id="category2"
                    label="Terminals"
                    value={terminalID}
                    onChange={(e) => {
                      setTerminalID(e.target.value);
                    }}
                  >
                    {journeyData?.availableTerminals?.map((item, index) => {
                      return (
                        <MenuItem key={index} value={item._id}>
                          {item.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
              <button
                className="hover:bg-halloweenOrange bg-gamboge ml-8 text-white font-semibold text-lg rounded py-2 px-6 mt-4"
                style={{
                  boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  if (start) {
                    completeJourney();
                    console.log("END");
                  } else {
                    setEndModalOpen(false);
                    alert("Please initiate a new journey");
                  }
                }}
              >
                CONFIRM
              </button>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default JourneyManageOption;
