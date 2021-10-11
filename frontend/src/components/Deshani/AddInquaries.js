/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import ReplayIcon from "@material-ui/icons/Replay";
import * as Yup from "yup";
import { Formik } from "formik";
import Select from "react-select";

const AddInquaries = () => {
  const [optionsTokens, setoptionsTokens] = useState([]);
  const [optionsJourneys, setoptionsJourneys] = useState([]);
  const [type, settype] = useState("inspection");
  const [journeyID, setjourneyID] = useState("");
  const [token, settoken] = useState("");
  const [tokenFetched, settokenFetched] = useState(false);
  let dataJourneys = [];
  let dataTokens = [];

  //create Inquaries
  const CreateInquary = async (values) => {
    let dataObject = {
      note: values.note,
      type: type,
      adversaryID: token,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .post(
          "http://localhost:6500/matrix/api/inspector/createInquiry",
          dataObject,
          config
        )

        .then(() => {
          alert("New Inquary Added");
          window.location.reload(false);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  //Fetch current journey tokens
  const getCurrentTokens = async (ID) => {
    const JID = ID;

    try {
      await axios
        .get(
          `http://localhost:6500/matrix/api/inspector/getCurrentJourneyTokens/${JID}`
        )
        .then((res) => {
          res.data.tokens.map((item, index) => {
            let awailableTokens = {
              value: item._id,
              label: item.passengerID,
            };
            dataTokens.push(awailableTokens);
          });

          setoptionsTokens(dataTokens);
          settokenFetched(true);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  //fetch all Journeys
  const getAllJourneys = async () => {
    try {
      await axios
        .get(`http://localhost:6500/matrix/api/inspector/getAllJourneys`)
        .then((res) => {
          res.data.Journey.map((item, index) => {
            let awailableTokens = {
              value: item._id,
              label: item._id,
            };
            dataJourneys.push(awailableTokens);
          });

          setoptionsJourneys(dataJourneys);
        })
        .catch((err) => {
          alert(err.message);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  useEffect(() => {
    getAllJourneys();
  }, []);

  return (
    <div>
      {" "}
      <div>
        <div className="w-full m-auto h-auto mb-5 r ml-12">
          <div className="w-2/3 m-auto mt-20 bg-white rounded-lg shadow-lg p-10">
            <div className="mt-4">
              <Formik
                initialValues={{
                  note: "",
                }}
                onSubmit={async (values) => {
                  CreateInquary(values);
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
                            Select Journey
                          </h1>
                        </div>
                      </Grid>
                      <Grid item md={6}>
                        <div>
                          {" "}
                          <Select
                            options={optionsJourneys}
                            onChange={(event) => {
                              setjourneyID(event.value);

                              getCurrentTokens(event.value);
                            }}
                            className="basic-multi-select"
                          />
                        </div>
                      </Grid>

                      {tokenFetched && (
                        <>
                          <Grid item md={4}>
                            <div>
                              <h1 className="text-l text-left text-black font-bold mb-5">
                                Inquiry Note
                              </h1>
                            </div>
                          </Grid>
                          <Grid item md={6}>
                            <div>
                              <textarea
                                className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                  errors.bulkPercentage &&
                                  touched.bulkPercentage
                                    ? "border-red-500"
                                    : "border-gray-600"
                                } text-base`}
                                id="destination"
                                type="text"
                                placeholder=""
                                onChange={handleChange("note")}
                                value={values.note}
                              />
                              {errors.bulkPercentage &&
                              touched.bulkPercentage ? (
                                <div className="text-red-500 text-xs mt-1 md:text-sm">
                                  {errors.note}
                                </div>
                              ) : null}
                            </div>
                          </Grid>

                          <Grid item md={4}>
                            <div>
                              <h1 className="text-l text-left text-black font-bold mb-5 ">
                                Adversary
                              </h1>
                            </div>
                          </Grid>
                          <Grid item md={6}>
                            <div>
                              {" "}
                              <Select
                                options={optionsTokens}
                                onChange={(event) => {
                                  settoken(event.value);
                                }}
                                className="basic-multi-select"
                              />
                            </div>
                          </Grid>
                          <Grid item md={12}>
                            <div className="w-max m-auto">
                              <button
                                type="submit"
                                className="object-center focus:outline-none bg-gamboge text-snow-900 text-base rounded border hover:border-transparent w-32 h-10"
                                style={{
                                  boxShadow:
                                    "0px 10px 15px rgba(3, 17, 86, 0.25)",
                                  float: "right",
                                  color: "white",
                                }}
                              >
                                ADD
                              </button>
                            </div>
                          </Grid>
                        </>
                      )}
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

export default AddInquaries;
