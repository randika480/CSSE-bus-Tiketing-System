import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-responsive-modal";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import { Formik } from "formik";
import Button from "@material-ui/core/Button";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "@material-ui/lab/Alert";
import Icon from "@material-ui/core/Icon";

const SampleNewsletterModal = ({
  setModalVisible,
  modalVisible,
  currentJourney,
  removeModalOpen,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  // remove selected journey
  const removeJourney = async () => {
    const id = currentJourney._id;

    try {
      await axios
        .delete(`http://localhost:6500/matrix/api/manager/deleteJourney/${id}`)
        .then(() => {
          setIsAdded(true);
          setTimeout(() => {
            setModalVisible(false);
            window.location.reload(false);
          }, 2000);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  //update selected journey
  const updateJourneys = async (values) => {
    let dataObject = {
      JID: currentJourney._id,
      departure: values.disparture,
      destination: values.destination,
      takeOffTime: values.takeOffTime,
      arrivalTime: values.arrivalTime,
      availability: values.awailability,
      transporterID: values.transporter,
      conductorID: values.conductor,
    };

    try {
      await axios
        .put(
          "http://localhost:6500/matrix/api/manager/updateJourney",
          dataObject
        )
        .then(() => {
          alert("Journey Updated");
          window.location.reload(false);
        });
    } catch (err) {
      alert("error :" + err);
    }
  };

  return (
    <Modal
      open={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
      center
      styles={{
        modal: {
          borderRadius: "10px",
          maxWidth: "500px",
          width: "100%",
          marginTop: "5vw",
        },
      }}
      focusTrapped={true}
    >
      {/* render only when removeModalOpen false */}
      {!removeModalOpen && (
        <div className="m-auto">
          <h1 className="font-bold text-lg font-boldTallFont">
            Update Journey
          </h1>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={12}>
              <div>
                <div className="w-full  h-auto mb-5 bg-lightSilver m-auto">
                  <div className="w-full m-auto mt-5 bg-white p-5 rounded-lg shadow-lg">
                    <div className="mt-4">
                      <Formik
                        initialValues={{
                          disparture: currentJourney.departure,
                          destination: currentJourney.destination,
                          takeOffTime: currentJourney.takeOffTime,
                          arrivalTime: currentJourney.arrivalTime,
                          transporter: currentJourney.transporterID._id,
                          conductor: currentJourney.conductorID._id,
                          awailability: currentJourney.availability,
                        }}
                        onSubmit={async (values) => {
                          updateJourneys(values);
                        }}
                      >
                        {({
                          handleChange,
                          handleSubmit,
                          values,
                          errors,
                          touched,
                        }) => (
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
                                      errors.bulkPercentage &&
                                      touched.bulkPercentage
                                        ? "border-red-500"
                                        : "border-gray-600"
                                    } text-base`}
                                    id="destination"
                                    type="text"
                                    placeholder=""
                                    onChange={handleChange("destination")}
                                    value={values.destination}
                                  />
                                  {errors.bulkPercentage &&
                                  touched.bulkPercentage ? (
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
                                  <input
                                    className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                      errors.lable && touched.lable
                                        ? "border-red-500"
                                        : "border-gray-600"
                                    } text-base`}
                                    id="takeOffTime"
                                    type="text"
                                    placeholder=""
                                    onChange={handleChange("takeOffTime")}
                                    value={values.takeOffTime}
                                  />
                                  {errors.lable && touched.lable ? (
                                    <div className="text-red-500 text-xs mt-1 md:text-sm">
                                      {errors.lable}
                                    </div>
                                  ) : null}
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
                                  <input
                                    className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                      errors.lable && touched.lable
                                        ? "border-red-500"
                                        : "border-gray-600"
                                    } text-base`}
                                    id="arrivalTime"
                                    type="text"
                                    placeholder=""
                                    onChange={handleChange("arrivalTime")}
                                    value={values.arrivalTime}
                                  />
                                  {errors.lable && touched.lable ? (
                                    <div className="text-red-500 text-xs mt-1 md:text-sm">
                                      {errors.lable}
                                    </div>
                                  ) : null}
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
                                  <input
                                    className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                      errors.lable && touched.lable
                                        ? "border-red-500"
                                        : "border-gray-600"
                                    } text-base`}
                                    id="terminals"
                                    type="text"
                                    placeholder=""
                                    onChange={handleChange("transporter")}
                                    value={values.transporter}
                                  />
                                  {errors.lable && touched.lable ? (
                                    <div className="text-red-500 text-xs mt-1 md:text-sm">
                                      {errors.lable}
                                    </div>
                                  ) : null}
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
                                  <input
                                    className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                      errors.lable && touched.lable
                                        ? "border-red-500"
                                        : "border-gray-600"
                                    } text-base`}
                                    id="terminals"
                                    type="text"
                                    placeholder=""
                                    onChange={handleChange("conductor")}
                                    value={values.conductor}
                                  />
                                  {errors.lable && touched.lable ? (
                                    <div className="text-red-500 text-xs mt-1 md:text-sm">
                                      {errors.lable}
                                    </div>
                                  ) : null}{" "}
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
                                  <input
                                    className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                      errors.lable && touched.lable
                                        ? "border-red-500"
                                        : "border-gray-600"
                                    } text-base`}
                                    id="awailability"
                                    type="text"
                                    placeholder=""
                                    onChange={handleChange("awailability")}
                                    value={values.awailability}
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
                                      boxShadow:
                                        "0px 10px 15px rgba(3, 17, 86, 0.25)",
                                      float: "right",
                                      color: "white",
                                    }}
                                  >
                                    Update
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
            </Grid>
          </Grid>
        </div>
      )}
      {/* render only when removeModalOpen true */}
      {removeModalOpen && (
        <div className="px-4 pt-6 pb-4 md:pb-7 md:px-8">
          <h6 className="ml-4 mt-0 mb-1 font-black text-2xl text-center">
            Delete Journey
          </h6>
          <hr></hr>
          <div className="text-center text-ferrariRed m-5 ">
            <Icon>
              <HighlightOffOutlinedIcon style={{ fontSize: 60 }} />
            </Icon>
          </div>

          <h6 className="text-center text-lg">
            Do you need to remove This Journey?? This process cannot be undone.
          </h6>
          {isAdded && <Alert severity="success">Journey Removed</Alert>}
          <div className="text-center mt-8 grid grid-cols-2 gap-3">
            <div className="text-right">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  removeJourney();
                }}
              >
                Agree
              </Button>
            </div>
            <div className="text-left">
              <Button
                autoFocus
                variant="contained"
                onClick={() => {
                  setModalVisible(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default SampleNewsletterModal;
