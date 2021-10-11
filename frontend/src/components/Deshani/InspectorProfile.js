/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import * as Yup from "yup";
import { Formik } from "formik";
import Divider from "@material-ui/core/Divider";
import { Image } from "cloudinary-react";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType
);

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  username: Yup.string()
    .min(3, "Please enter a valid username")
    .required("Username is required"),
});

const InspectorProfile = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [file, setFile] = useState([]);

  return (
    <div>
      <div className="w-4/5 h-auto bg-lightSilver m-auto p-10 mt-10 mb-10">
        <div className="shadow-2xl bg-white mb-10 mt-10">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <div>
                <div className="border-blue-900 w-max h-auto m-auto  p-1">
                  {" "}
                  <Image
                    className="w-full h-full object-contain "
                    cloudName="grid1234"
                    publicId="Profile_Pictures/b2v72qrnbivb0ncutrxy"
                    style={{
                      width: "200px",
                      height: "200px",
                      margin: "auto",
                    }}
                  />
                </div>
                <div className="w-2/3 h-auto m-auto p-2">
                  <div className=" border-lightSilver rounded-2xl border-8 m-1">
                    <FilePond
                      files={file}
                      onupdatefiles={setFile}
                      allowMultiple={false}
                      allowFileEncode={true}
                      maxFiles={1}
                      name="files"
                      credits={false}
                      labelIdle="Upload new profile picture"
                      allowFileTypeValidation={true}
                      acceptedFileTypes={["image/*"]}
                      labelFileTypeNotAllowed={
                        "Please import valid profile picture"
                      }
                      allowImagePreview
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <div className="m-auto">
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={12}>
                    <div>
                      <div className="w-full  h-auto mb-5  m-auto pt-11">
                        <div className="w-full m-auto mt-5 bg-white p-5 rounded-lg shadow-lg">
                          <div className="mt-4">
                            <Formik
                              initialValues={{
                                username: "Inspector 1",
                                email: "inspector1@gmail.com",
                              }}
                              validationSchema={validationSchema}
                              onSubmit={async (values) => {}}
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
                                          Username
                                        </h1>
                                      </div>
                                    </Grid>
                                    <Grid item md={6}>
                                      <div>
                                        <input
                                          className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                            errors.username && touched.username
                                              ? "border-red-500"
                                              : "border-gray-600"
                                          } text-base`}
                                          id="username"
                                          type="text"
                                          placeholder={username}
                                          onChange={handleChange("username")}
                                          value={values.username}
                                        />
                                        {errors.username && touched.username ? (
                                          <div className="text-red-500 text-xs mt-1 md:text-sm">
                                            {errors.username}
                                          </div>
                                        ) : null}
                                      </div>
                                    </Grid>

                                    <Grid item md={4}>
                                      <div>
                                        <h1 className="text-l text-left text-black font-bold mb-5 ">
                                          Email
                                        </h1>
                                      </div>
                                    </Grid>
                                    <Grid item md={6}>
                                      <div>
                                        {" "}
                                        <input
                                          className={`focus:outline-none w-full pb-2 md:pb-3 border-b focus:border-blue-900 ${
                                            errors.email && touched.email
                                              ? "border-red-500"
                                              : "border-gray-600"
                                          } text-base`}
                                          id="email"
                                          type="text"
                                          placeholder={email}
                                          onChange={handleChange("email")}
                                          value={values.email}
                                        />
                                        {errors.email && touched.email ? (
                                          <div className="text-red-500 text-xs mt-1 md:text-sm">
                                            {errors.email}
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
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default InspectorProfile;
