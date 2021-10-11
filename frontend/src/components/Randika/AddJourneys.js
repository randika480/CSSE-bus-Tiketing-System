/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

import Grid from "@material-ui/core/Grid";

import * as Yup from "yup";
import { Formik } from "formik";
import Select from "react-select";

const AddJourneys = () => {
  const [terMinals, setTerminals] = useState([]);
  const [options, setOptions] = useState([]);
  const [transporter, setTransporter] = useState("");
  const [conductor, setconductor] = useState("");
  const [awailability, setawailability] = useState("");
  const [optionsTransporters, setOptionsTransporters] = useState([]);
  const [optionsConductors, setoptionsConductors] = useState([]);
  const [optionsAwailability, setoptionsAwailability] = useState([]);
  let data = [];
  let dataTransporters = [];
  let dataConductors = [];
  let dataAwailability = [];

  // Initialize Awailable dates
  const awailableDays = [
    {
      name: "daily",
      id: "daily",
    },
    {
      name: "weekdays",
      id: "weekdays",
    },
    {
      name: "weekend",
      id: "weekend",
    },
    {
      name: "monday",
      id: "monday",
    },
    {
      name: "tuesday",
      id: "tuesday",
    },
    {
      name: "wednesday",
      id: "wednesday",
    },
    {
      name: "thursday",
      id: "thursday",
    },
    {
      name: "friday",
      id: "friday",
    },
    {
      name: "saturday",
      id: "saturday",
    },
    {
      name: "sunday",
      id: "sunday",
    },
  ];

  // Create New Journey
  const CreateNewJourney = async (values) => {
    let dataObject = {
      departure: values.disparture,
      destination: values.destination,
      takeOffTime: values.takeOffTime,
      arrivalTime: values.arrivalTime,
      transporterID: transporter,
      conductorID: conductor,
      availability: awailability,
      availableTerminals: terMinals,
    };

    try {
      await axios
        .post(
          "http://localhost:6500/matrix/api/manager/createJourney",
          dataObject
        )

        .then(() => {
          alert("New Journey Added");
          window.location.reload(false);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  //fetch terminals
  const getTerminals = async () => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/manager/getTerminals")
        .then((res) => {
          res.data.Terminals.map((item, index) => {
            let awailableTerminals = {
              value: item._id,
              label: item.name,
            };
            data.push(awailableTerminals);
          });
          setOptions(data);

          awailableDays.map((item, index) => {
            let awailable = {
              value: item.id,
              label: item.name,
            };
            dataAwailability.push(awailable);
          });
          setoptionsAwailability(dataAwailability);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  //fetch awailable conductors
  const getConductors = async () => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/manager/getConductors")
        .then((res) => {
          res.data.Conductors.map((item, index) => {
            let awailableConductors = {
              value: item._id,
              label: item.username,
            };
            dataConductors.push(awailableConductors);
          });

          setoptionsConductors(dataConductors);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  //fetch awailable transporters
  const getTransporters = async () => {
    try {
      await axios
        .get("http://localhost:6500/matrix/api/manager/getTransporters")
        .then((res) => {
          res.data.Transporters.map((item, index) => {
            let awailableTransporters = {
              value: item._id,
              label: item.VRN,
            };
            dataTransporters.push(awailableTransporters);
          });

          setOptionsTransporters(dataTransporters);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  useEffect(() => {
    getTerminals();
    getTransporters();
    getConductors();
  }, []);

  //add all selected terminals to terminals array
  const onTerminalSelected = async (e) => {
    setTerminals(e ? e.map((item) => item.value) : []);
  };

  return (
    <div>
      {" "}
      <div>
        <div className="w-full m-auto h-auto mb-5  ml-12">
          <div className="w-2/3 m-auto mt-5 bg-white p-5 rounded-lg shadow-lg">
            <h1 className=" text-lg text-center font-bold mt-2">
              Add New Journey
            </h1>
            <div className="mt-4">
              <Formik
                initialValues={{
                  disparture: "",
                  destination: "",
                  takeOffTime: "",
                  arrivalTime: "",
                  transporter: "",
                  conductor: "",
                  terminals: "",
                  awailability: "",
                }}
                onSubmit={async (values) => {
                  CreateNewJourney(values);
                }}
              >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                  <form
                    onSubmit={(event) => {
                      event.preventDefault();
                      handleSubmit();
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item md={4}>
                        <div>
                          <h1 className="text-l text-left text-black font-bold mb-5 ">
                            Dispature
                          </h1>
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div>
                          <input
                            className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                              errors.regularPercentage &&
                              touched.regularPercentage
                                ? "border-red-500"
                                : "border-gray-600"
                            } text-base`}
                            id="disparture"
                            type="text"
                            placeholder=""
                            onChange={handleChange("disparture")}
                            value={values.disparture}
                          />
                          {errors.regularPercentage &&
                          touched.regularPercentage ? (
                            <div className="text-red-500 text-xs mt-1 md:text-sm">
                              {errors.regularPercentage}
                            </div>
                          ) : null}
                        </div>
                      </Grid>
                      <Grid item md={4}>
                        <div>
                          <h1 className="text-l text-left text-black font-bold mb-5">
                            Destination
                          </h1>
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div>
                          <input
                            className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                              errors.bulkPercentage && touched.bulkPercentage
                                ? "border-red-500"
                                : "border-gray-600"
                            } text-base`}
                            id="destination"
                            type="text"
                            placeholder=""
                            onChange={handleChange("destination")}
                            value={values.destination}
                          />
                          {errors.bulkPercentage && touched.bulkPercentage ? (
                            <div className="text-red-500 text-xs mt-1 md:text-sm">
                              {errors.bulkPercentage}
                            </div>
                          ) : null}
                        </div>
                      </Grid>
                      <Grid item md={4}>
                        <div>
                          <h1 className="text-l text-left text-black font-bold mb-5 ">
                            Takeoff Time
                          </h1>
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div>
                          {" "}
                          <TextField
                            id="time"
                            label="Alarm clock"
                            ampmInClock="true"
                            type="time"
                            defaultValue="07:30"
                            onChange={handleChange("takeOffTime")}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300, // 5 min
                            }}
                            sx={{ width: 150 }}
                          />
                        </div>
                      </Grid>
                      <Grid item md={4}>
                        <div>
                          <h1 className="text-l text-left text-black font-bold mb-5 ">
                            Arrival Time
                          </h1>
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div>
                          {" "}
                          <TextField
                            id="time"
                            label="Alarm clock"
                            type="time"
                            defaultValue="07:30"
                            onChange={handleChange("arrivalTime")}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300, // 5 min
                            }}
                            sx={{ width: 150 }}
                          />
                        </div>
                      </Grid>
                      <Grid item md={4}>
                        <div>
                          <h1 className="text-l text-left text-black font-bold mb-5 ">
                            Transporter
                          </h1>
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div>
                          {" "}
                          <Select
                            options={optionsTransporters}
                            onChange={(event) => {
                              setTransporter(event.value);
                            }}
                            className="basic-multi-select"
                          />
                        </div>
                      </Grid>
                      <Grid item md={4}>
                        <div>
                          <h1 className="text-l text-left text-black font-bold mb-5 ">
                            Conductor
                          </h1>
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div>
                          {" "}
                          <Select
                            options={optionsConductors}
                            onChange={(event) => {
                              setconductor(event.value);
                            }}
                            className="basic-multi-select"
                          />
                        </div>
                      </Grid>
                      <Grid item md={4}>
                        <div>
                          <h1 className="text-l text-left text-black font-bold mb-5 ">
                            Terminals
                          </h1>
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div>
                          {" "}
                          <Select
                            options={options}
                            onChange={(event) => {
                              onTerminalSelected(event);
                            }}
                            className="basic-multi-select"
                            isMulti
                          />
                        </div>
                      </Grid>
                      <Grid item md={4}>
                        <div>
                          <h1 className="text-l text-left text-black font-bold mb-5 ">
                            Awailability
                          </h1>
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div>
                          {" "}
                          <Select
                            options={optionsAwailability}
                            onChange={(event) => {
                              setawailability(event.value);
                            }}
                            className="basic-multi-select"
                          />
                          {errors.lable && touched.lable ? (
                            <div className="text-red-500 text-xs mt-1 md:text-sm">
                              {errors.lable}
                            </div>
                          ) : null}
                        </div>
                      </Grid>

                      <Grid item md={12}>
                        <div className="w-max m-auto">
                          <button
                            type="submit"
                            className="object-center focus:outline-none bg-gamboge text-snow-900 text-base rounded border hover:border-transparent w-32 h-10"
                            style={{
                              boxShadow: "0px 10px 15px rgba(3, 17, 86, 0.25)",
                              float: "right",
                              color: "white",
                            }}
                          >
                            ADD
                          </button>
                        </div>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddJourneys;
